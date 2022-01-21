import model
from helper_classes.request_classes.geoSimilarRequest import GeoSimilarRequest

def geo_similar_search(input_request):
    """Get similar services based on the item_id description and coordinates.
    Obtenez des services pareilles de la description d'une service et coordonees.
    """
    geo_similar_request =  GeoSimilarRequest(input_request)
    result_IDs = ["'" + str(geo_similar_request.item_id) + "'"]
    results = model.get_constrained_results(geo_similar_request, result_IDs, result_IDs[0],
                    geo_similar_request.employment, geo_similar_request.volunteer, geo_similar_request.community_services)
    return {'status_code': 200, 'body': results}