from helper_classes import result
import model
import numpy as np


def search(
    session_token: str,
    search_request: result.SearchRequest,
    app_state: result.AppState,
    vector_model
):
    """Gets the search query, vectorizes, searches cache, returns agencies.
    """
    vector = np.asarray(vector_model(search_request.query))
    number_of_results = 25
    _, indexes = app_state.cache.search(vector, number_of_results)
    results = []
    for index in indexes[0]:
        item_id = app_state.index_to_ID[index]
        item = app_state.items[item_id]
        results.append(item)
    return results


def get_similar(
    session_token: str,
    item_id: str,
    app_state: result.AppState,
    vector_model
):
    """Get similar services based on the item_id description.
    """
    # Store pair for better recommendations in the future
    model.store_pair(session_token, item_id)

    # Get description from item ID, create a SearchRequest, then call search()
    description = app_state.items[item_id].description
    search_request = result.SearchRequest(
        query=description,
    )
    results = search(session_token, search_request, app_state, vector_model)
    return results
