from . import model
from .libs.services import external
from .libs.services.cutoff_filter import filter_indexes_by_cutoff
from .libs.helper_classes.request_classes.searchRequest import SearchRequest


def search(input_request):
    """Gets the search query, vectorizes, searches cache, returns services.
    Obtient les resultats de la recherche, mets en vecteur, cherche parmis les
    resultats et les retourne. 
    """
    search_request = SearchRequest(query=input_request['query'])

    vector = external.get_huggingface_vector(search_request.query)
    # vector = [range(10)]
    result_IDs, distances = external.search_cache(vector=vector)
    
    print(result_IDs, distances)
    
    search_employment = search_request.employment
    search_volunteer = search_request.volunteer
    search_community_services = search_request.community_services

    number_of_results = 5000
    if search_request.cutoff is not None:
        result_IDs = filter_indexes_by_cutoff(
            result_IDs, distances, search_request.cutoff, number_of_results)

    if search_request.cutoff is not None:
        results = model.get_proximity_results(
            result_IDs, search_request.page, search_request.size, search_request.lat,
            search_request.lng, search_employment, search_volunteer, search_community_services)
    else:
        results = model.get_results(
            result_IDs, search_request.page, search_request.size, search_employment,
            search_volunteer, search_community_services)
    
    return {'status_code': 200, 'body': results}