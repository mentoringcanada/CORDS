import os
from services import converters
import psycopg
import queries
from helper_classes.other_classes.item import Item


PSQL_CONNECT_STR = os.environ.get('PSQL_CONNECT_STR')


def execute(sql, params=()):
    connection = psycopg.connect(
        PSQL_CONNECT_STR)
    cursor = connection.cursor(row_factory=psycopg.rows.dict_row)
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
