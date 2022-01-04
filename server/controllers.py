from helper_classes.other_classes.itemList import ItemList
from helper_classes.request_classes.itemIdList import ItemIdList
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
from services import external
import os

VECTOR_SERVICE_TYPE = os.environ['VECTOR_SERVICE_TYPE']

def get_vector(query_string):
    """Gets the vector for the query string by invoking the appropriate service.
    HuggingFace vector service if VECTOR_SERVICE_TYPE configured in .env.sh is 'HF',
    else calls the existing vector service.
    """
    print("VECTOR_SERVICE_TYPE ", VECTOR_SERVICE_TYPE)
    if VECTOR_SERVICE_TYPE == 'HF':     # If using HuggingFace model and vectorizing (service running on port 8003)..
        return external.get_huggingface_vector(query_string)
    else:       # IF using model_directory model and vectorizing (service running on port 8001)
        return external.get_vector(query_string)

def search(
    session_token: str,
    search_request: SearchRequest):
    """Gets the search query, vectorizes, searches cache, returns services.
    Obtient les resultats de la recherche, mets en vecteur, cherche parmis les
    resultats et les retourne. 
    """
    vector = get_vector(search_request.query)
    response = external.search_cache(vector)
    # indexes = response['indexes']
    distances = response['distances']
    result_IDs = response['data']
    # app_state = response['app_state']

    search_employment = search_request.employment
    search_volunteer = search_request.volunteer
    search_community_services = search_request.community_services

    number_of_results = 5000
    if search_request.cutoff is not None:
        result_IDs = filter_indexes_by_cutoff(
            result_IDs, distances, search_request.cutoff, number_of_results)

    # result_IDs = converters.items2str(indexes, app_state.index_to_ID)

    if search_request.cutoff is not None:
        results = model.get_proximity_results(
            result_IDs, search_request.page, search_request.size, search_request.lat,
            search_request.lng, search_employment, search_volunteer, search_community_services)
    else:
        results = model.get_results(
            result_IDs, search_request.page, search_request.size, search_employment,
            search_volunteer, search_community_services)
    return results


def get_similar(
    session_token: str,
    item_id: str):
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
    results = search(session_token, search_request)
    return results


def geo_search(
        session_token: str,
        geo_search_request: GeoSearchRequest):
    """Return distance-constrained query."""
    vector = get_vector(geo_search_request.query)

    response = external.search_cache(vector)
    distances = response['distances']
    result_IDs = response['data']

    search_employment = geo_search_request.employment
    search_volunteer = geo_search_request.volunteer
    search_community_services = geo_search_request.community_services

    number_of_results = 5000
    if geo_search_request.cutoff is not None:
        result_IDs = filter_indexes_by_cutoff(
            result_IDs, distances, geo_search_request.cutoff, number_of_results)

    result_IDs = ["'" + str(geo_search_request.item_id) + "'"] + result_IDs

    if geo_search_request.cutoff is not None:
        results = model.get_cutoff_constrained_results(
            result_IDs, geo_search_request, search_employment, search_volunteer, search_community_services)
    else:
        results = model.get_constrained_results(
            geo_search_request, result_IDs, False, search_employment, search_volunteer, search_community_services)
    return results


def geo_similar_search(
    session_token: str,
    geo_similar_request: GeoSimilarRequest):
    """Get similar services based on the item_id description and coordinates.
    Obtenez des services pareilles de la description d'une service et coordonees.
    """
    # Get description from item ID, create a SearchRequest, then call search()
    # geo_similar_request.item_id = model.clean_text(geo_similar_request.item_id)
    # vector = model.get_vector_from_ID(geo_similar_request.item_id)
    # number_of_results = 5000
    # packed = np.asarray([vector])
    # distances, indexes = app_state.cache.search(packed, number_of_results)
    # indexes = indexes[0]
    # distances = distances[0]

    # if geo_similar_request.cutoff is not None:
    #     indexes = filter_indexes_by_cutoff(
    #         indexes, distances, geo_similar_request.cutoff, number_of_results)

    # result_IDs = converters.items2str(
    #     indexes, app_state.index_to_ID, geo_similar_request.item_id)
    # if geo_similar_request.cutoff is not None:
    #     results = model.get_cutoff_constrained_results(
    #         result_IDs, geo_similar_request)
    # else:
    #     results = model.get_constrained_results(
    #         geo_similar_request, result_IDs)
    result_IDs = ["'" + str(geo_similar_request.item_id) + "'"]
    results = model.get_constrained_results(geo_similar_request, result_IDs, result_IDs[0])
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


def get_recommended_clusters_from_items(itemIdList: ItemIdList):
    items = [model.clean_text(i) for i in itemIdList.items]

    results = model.cluster_filtering_items(
        items,
        itemIdList.lat,
        itemIdList.lng,
        itemIdList.distance,
        itemIdList.community_services,
        itemIdList.employment,
        itemIdList.volunteer
    )

    cluster_ids = list(set([c.clusterId for c in results]))
    summaries = model.get_summaries_for_clusters(cluster_ids)

    return results, summaries


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
