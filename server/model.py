from functools import total_ordering
import os
from services import converters
import pandas
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.extras import execute_values
import queries
from helper_classes.request_classes.geoSearchRequest import GeoSearchRequest
from helper_classes.other_classes.item import Item


PSQL_CONNECT_STR = os.environ.get('PSQL_CONNECT_STR')
GTA_SERVICES_FILENAME = './GTA_211_Services.csv'


def execute(sql, params=()):
    connection = psycopg2.connect(
        PSQL_CONNECT_STR, cursor_factory=RealDictCursor)
    cursor = connection.cursor()
    cursor.execute(sql, params)
    connection.commit()
    try:
        return cursor.fetchall()
    except:
        return []


def execute_many(sql, data):
    connection = psycopg2.connect(
        PSQL_CONNECT_STR)
    cursor = connection.cursor()
    execute_values(cursor, sql, data, page_size=500)
    connection.commit()
    try:
        return cursor.fetchall()
    except:
        return []


def get_gta_services_csv():
    data = pandas.read_csv(GTA_SERVICES_FILENAME)
    return data.fillna('')


def write_data_to_file(data, filename):
    f = open(filename, 'a')
    for line in data:
        str_line = ','.join([str(l) for l in line])
        f.write(str_line + '\n')

    f.close()


def store_pair(session_token, item_id):
    ...


def get_all_vectors():
    return execute(queries.get_all_vectors)


def get_description_from_ID(item_id):
    item = execute(queries.get_item_by_id, (clean_text(item_id),))
    if len(item):
        item = item[0]
        text = (item['resource_description'] or '') + ' ' + \
            (item['public_name'] or '') + ' ' + \
            (item['nom_publique'] or '') + ' ' + \
            (item['description_francais'] or '')
        return text


def get_vector_from_ID(item_id):
    item = execute(queries.get_item_by_id, (clean_text(item_id),))
    try:
        item = item[0]
    except:
        return None
    vector = converters.textvec2vec(item['description_vector'])
    return vector


def clean_text(text):
    cleaned_text = ''
    ok_chars = set(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-')
    for char in text:
        if char in ok_chars:
            cleaned_text += char
    return cleaned_text


def get_codes_from_items(taxonomies):
    ok_chars = ' *-.,0123456789ABCDEFGHIJKLMNOPQRSTVWXYZ'
    new_text = ''
    for char in taxonomies:
        if char in ok_chars:
            new_text += char
    return taxonomies.split(',')


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


def get_cutoff_constrained_results(result_IDs: list, request: GeoSearchRequest, specific_id: str = False,
                                   search_employment: bool = False, search_volunteer: bool = False, search_community_services: bool = True):
    if specific_id:
        results = execute(queries.get_constrained_results_1.format(request.lat, request.lng) + str(result_IDs[0]) + queries.get_constrained_results_2.format(request.lat, request.lng, request.distance, result_IDs))
        total_results = 1
        items = [Item.from_db_row(i) for i in results]
        return {'items': items, 'totalResults': total_results}

    result_IDs = ', '.join(result_IDs)

    inclusion_filter = converters.build_inclusion_filter(
        search_employment, search_volunteer, search_community_services)

    query_results = execute(queries.get_cutoff_constrained_results_1.format(request.lat, request.lng) +
                            result_IDs + (queries.get_cutoff_constrained_results_2 + inclusion_filter + queries.get_cutoff_constrained_results_3).format(request.lat, request.lng, request.distance))

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


def save_feedback(item):
    execute(queries.save_feedback, item)


def sanitize_basket(text):
    if text is None:
        return None
    cleaned_text = ''
    ok_chars = set(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-')
    for char in text:
        if char in ok_chars:
            cleaned_text += char
    return cleaned_text

def get_items(session):
    session = sanitize_basket(session)
    results = execute(queries.get_items_by_session, (session,))
    return [Item.from_db_row(r) for r in results]


def cluster_filtering_items(items, lat, lng, distance, community_services, employment, volunteer):
    inclusion_filter = converters.build_inclusion_filter(
        employment, volunteer, community_services)

    if lat is not None and lng is not None:
        if distance is None:
            distance = 50
        if distance < 3:
            distance = 3
        if distance > 500:
            distance = 500
        distance_filter = queries.distance.format(lat, lng)
        results = execute(queries.cluster_filtering_1 + ' , ' + distance_filter + " as distance " +
                          queries.cluster_filtering_2.format(items) + distance_filter + ' < ' + str(distance) + inclusion_filter + queries.cluster_filtering_3.format(lat, lng))
    else:
        results = execute(queries.cluster_filtering_1 +
                          queries.cluster_filtering_2.format(items) + ' 1=1 ' + inclusion_filter + " LIMIT 50;")

    results = [Item.from_db_row(r) for r in results]
    return results


def get_summaries_for_clusters(cluster_IDs):
    results = execute(queries.get_summaries_for_clusters.format(cluster_IDs))
    return [r['summary'] for r in results]
