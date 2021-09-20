from helper_classes.other_classes.itemList import ItemList
from helper_classes.other_classes.cluster import Cluster
from helper_classes.other_classes.clusterList import ClusterList
from helper_classes.other_classes.appState import AppState
from helper_classes.request_classes.geoSearchRequest import GeoSearchRequest
from helper_classes.request_classes.geoSimilarRequest import GeoSimilarRequest
from helper_classes.request_classes.searchRequest import SearchRequest
import model
import numpy as np
from services import converters
from services.cutoff_filter import filter_indexes_by_cutoff
from services import cluster_recommendations


def search(
    session_token: str,
    search_request: SearchRequest,
    app_state: AppState,
    vector_model
):
    """Gets the search query, vectorizes, searches cache, returns services.
    Obtient les resultats de la recherche, mets en vecteur, cherche parmis les
    resultats et les retourne. 
    """
    vector = np.asarray(vector_model(search_request.query))
    number_of_results = 1000
    distances, indexes = app_state.cache.search(vector, number_of_results)
    indexes = indexes[0]
    distances = distances[0]

    if search_request.cutoff is not None:
        indexes = filter_indexes_by_cutoff(
            indexes, distances, search_request.cutoff, number_of_results)

    result_IDs = converters.items2str(indexes, app_state.index_to_ID)

    if search_request.cutoff is not None:
        results = model.get_proximity_results(
            result_IDs, search_request.page, search_request.size, search_request.lat, search_request.lng)
    else:
        results = model.get_results(
            result_IDs, search_request.page, search_request.size)

    return results


def get_similar(
    session_token: str,
    item_id: str,
    app_state: AppState,
    vector_model
):
    """(OBSOLETE) Get similar services based on the item_id description.
    Obtenez des services pareilles de la description d'une service.
    """
    # Store pair for better recommendations in the future
    # model.store_pair(session_token, item_id)

    # Get description from item ID, create a SearchRequest, then call search()
    text_vec = converters.convert2text(
        model.get_description_from_ID(item_id))
    text = converters.convert2text(text_vec)
    search_request = SearchRequest(
        query=text,
    )
    results = search(session_token, search_request, app_state, vector_model)
    return results


def geo_search(
        session_token: str,
        geo_search_request: GeoSearchRequest,
        app_state: AppState,
        vector_model):
    """Return distance-constrained query."""
    vector = np.asarray(vector_model(geo_search_request.query))
    number_of_results = 1000
    distances, indexes = app_state.cache.search(vector, number_of_results)
    indexes = indexes[0]
    distances = distances[0]

    if geo_search_request.cutoff is not None:
        indexes = filter_indexes_by_cutoff(
            indexes, distances, geo_search_request.cutoff, number_of_results)

    result_IDs = converters.items2str(
        indexes, app_state.index_to_ID, geo_search_request.item_id)

    if geo_search_request.cutoff is not None:
        results = model.get_cutoff_constrained_results(
            result_IDs, geo_search_request)
    else:
        results = model.get_constrained_results(geo_search_request, result_IDs)

    return results


def geo_similar_search(
    session_token: str,
    geo_similar_request: GeoSimilarRequest,
    app_state: AppState
):
    """Get similar services based on the item_id description and coordinates.
    Obtenez des services pareilles de la description d'une service et coordonees.
    """
    # Get description from item ID, create a SearchRequest, then call search()
    geo_similar_request.item_id = model.clean_text(geo_similar_request.item_id)
    vector = model.get_vector_from_ID(geo_similar_request.item_id)
    number_of_results = 1000
    packed = np.asarray([vector])
    distances, indexes = app_state.cache.search(packed, number_of_results)
    indexes = indexes[0]
    distances = distances[0]

    if geo_similar_request.cutoff is not None:
        indexes = filter_indexes_by_cutoff(
            indexes, distances, geo_similar_request.cutoff, number_of_results)

    result_IDs = converters.items2str(
        indexes, app_state.index_to_ID, geo_similar_request.item_id)
    if geo_similar_request.cutoff is not None:
        results = model.get_cutoff_constrained_results(
            result_IDs, geo_similar_request)
    else:
        results = model.get_constrained_results(geo_similar_request, result_IDs)
    return results


def get_recommended_clusters_from_taxonomies(taxonomies):
    # sanitize inputs
    taxonomy_codes = model.get_codes_from_items(taxonomies)
    cluster_IDs = cluster_recommendations.get_cluster_recommendations_from_taxonomies(
        taxonomy_codes, 5)
    data = model.execute("""SELECT *,
    (two_dim[0] - (select min(two_dim[0]) from clusters)) / (select max(two_dim[0]) - min(two_dim[0]) from clusters) as scaled_x,
    (two_dim[1] - (select min(two_dim[1]) from clusters)) / (select max(two_dim[1]) - min(two_dim[1]) from clusters) as scaled_y
    FROM clusters 
    WHERE cluster_id = any(%s)""", (cluster_IDs,))
    output = ClusterList(clusters=[Cluster.from_db_row(d) for d in data])
    return output


def save_feedback(data):
    item = [
        data.query,
        data.item_id,
        data.sortOrder,
        data.msg,
        data.type,
    ]
    model.save_feedback(item)


def add_item(basketItem, session):
    item_id = basketItem.item_id
    model.save_item(item_id, session)


def remove_item(basketItem, session):
    item_id = basketItem.item_id
    model.remove_item(item_id, session)


def get_items(session):
    items = model.get_items(session)
    return ItemList(items=items, totalResults=len(items))
