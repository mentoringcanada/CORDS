import os
import psycopg2
import queries
from services import converters
from helper_classes.other_classes.item import Item
from helper_classes.request_classes.geoSearchRequest import GeoSearchRequest

PSQL_CONNECT_STR = os.environ.get('PSQL_CONNECT_STR')


def execute(sql, params=()):
    connection = psycopg2.connect(
        PSQL_CONNECT_STR)
    cursor = connection.cursor(row_factory=psycopg2.rows.dict_row)
    cursor.execute(sql, params, prepared=True)
    connection.commit()
    try:
        return cursor.fetchall()
    except:
        return []


def get_proximity_results(result_IDs: list, page: int, size: int, lat: float,
                          lng: float, search_employment: bool, search_volunteer: bool, search_community_services: bool):
    if not page:
        page = 1
    else:
        page = max(page, 1)
    result_IDs_string = ', '.join(result_IDs)
    limit = page*size

    inclusion_filter = converters.build_inclusion_filter(
        search_employment, search_volunteer, search_community_services)

    query_results = execute((queries.get_proximity_results + inclusion_filter + queries.get_proximity_results_2).format(
        result_IDs_string, lat, lng, limit))
    total_results = len(query_results)
    query_results = query_results[limit-size:limit]
    items = []
    sort_order = 1
    for query_result in query_results:
        items.append(Item.from_db_row(query_result))
        items[-1].sortOrder = sort_order
        sort_order += 1

    return {'items': items, 'totalResults': total_results}


def get_results(result_IDs: list, page: int, size: int, search_employment: bool = False,
                search_volunteer: bool = False, search_community_services: bool = True):
    if not page:
        page = 1
    else:
        page = max(page, 1)
    result_IDs_string = ', '.join(result_IDs)
    
    inclusion_filter = converters.build_inclusion_filter(
        search_employment, search_volunteer, search_community_services)
    query_results = execute((queries.get_results + inclusion_filter + queries.get_results_2).format(
        result_IDs_string, result_IDs))
    total_results = len(query_results)
    limit = page*size
    print('PAGE: ', page, ' SIZE: ', size, ' LIMIT: ', limit)
    query_results = query_results[limit-size:limit]
    items = []
    sort_order = 1
    for query_result in query_results:
        items.append(Item.from_db_row(query_result))
        items[-1].sortOrder = sort_order
        sort_order += 1

    return {'items': items, 'totalResults': total_results}

def get_constrained_results(request: GeoSearchRequest, result_IDs: list, specific_id: str = False,
                            search_employment=False, search_volunteer=False, search_community_services=True):
    if specific_id:
        result_IDs.remove(specific_id)
        result_IDs = [specific_id] + result_IDs
    result_IDs = ', '.join(result_IDs)
    inclusion_filter = converters.build_inclusion_filter(search_employment, search_volunteer, search_community_services)

    query_results = execute(queries.get_constrained_results_1.format(request.lat, request.lng) +
                            result_IDs + queries.get_constrained_results_2.format(request.lat, request.lng, request.distance, result_IDs) +
                            inclusion_filter + queries.get_constrained_results_3.format(result_IDs))
    total_results = len(query_results)
    if not request.page:
        request.page = 1
    else:
        request.page = max(request.page, 1)

    size = request.size
    query_results = query_results[request.page*size-size:request.page*size]

    items = []
    sort_order = 1
    for query_result in query_results:
        items.append(Item.from_db_row(query_result))
        items[-1].sortOrder = sort_order
        sort_order += 1

    return {'items': items, 'totalResults': total_results}
