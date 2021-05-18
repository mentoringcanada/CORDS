from helper_classes.other_classes.appState import AppState
from helper_classes.request_classes.geoSearchRequest import GeoSearchRequest
from helper_classes.request_classes.searchRequest import SearchRequest
import model
import numpy as np
from services import converters

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
    number_of_results = 10
    _, indexes = app_state.cache.search(vector, number_of_results)
    result_IDs = []
    for index in indexes[0]:
        item_id = app_state.index_to_ID[index]
        result_IDs.append("'" + item_id + "'")
    results = model.get_results(result_IDs)
    return results


def get_similar(
    session_token: str,
    item_id: str,
    app_state: AppState,
    vector_model
):
    """Get similar services based on the item_id description.
    Obtenez des services pareilles de la description d'une service.
    """
    # Store pair for better recommendations in the future
    # model.store_pair(session_token, item_id)

    # Get description from item ID, create a SearchRequest, then call search()
    description = converters.convert2text(model.get_description_from_ID(item_id))
    search_request = SearchRequest(
        query=description,
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
    _, indexes = app_state.cache.search(vector, number_of_results)
    result_IDs = []
    for index in indexes[0]:
        item_id = app_state.index_to_ID[index]
        result_IDs.append("'" + item_id + "'")
    results = model.get_constrained_results(geo_search_request, result_IDs)
    return results[:10]
