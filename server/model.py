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
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
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


def get_proximity_results(result_IDs: list, page: int, size: int, lat: float, lng: float):
    if not page:
        page = 1
    else:
        page = max(page, 1)
    result_IDs_string = ', '.join(result_IDs)
    limit = page*size
    query_results = execute(queries.get_proximity_results.format(
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


def get_results(result_IDs: list, page: int, size: int):
    if not page:
        page = 1
    else:
        page = max(page, 1)
    result_IDs_string = ', '.join(result_IDs)
    query_results = execute(queries.get_results.format(
        result_IDs_string, result_IDs))
    total_results = len(query_results)
    limit = page*size
    query_results = query_results[limit-size:limit]
    items = []
    sort_order = 1
    for query_result in query_results:
        items.append(Item.from_db_row(query_result))
        items[-1].sortOrder = sort_order
        sort_order += 1

    return {'items': items, 'totalResults': total_results}


def get_cutoff_constrained_results(result_IDs: list, request: GeoSearchRequest, specific_id: str = False):
    if specific_id:
        result_IDs.remove(specific_id)
        result_IDs = [specific_id] + result_IDs
    result_IDs = ', '.join(result_IDs)
    query_results = execute(queries.get_cutoff_constrained_results_1.format(request.lat, request.lng) +
                            result_IDs + queries.get_cutoff_constrained_results_2.format(request.lat, request.lng, request.distance))

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


def get_constrained_results(request: GeoSearchRequest, result_IDs: list, specific_id: str = False):
    if specific_id:
        result_IDs.remove(specific_id)
        result_IDs = [specific_id] + result_IDs
    result_IDs = ', '.join(result_IDs)
    query_results = execute(queries.get_constrained_results_1.format(request.lat, request.lng) +
                            result_IDs + queries.get_constrained_results_2.format(request.lat, request.lng, request.distance, result_IDs))

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


def save_item(item_id, session):
    item_id = sanitize_basket(item_id)
    session = sanitize_basket(session)
    execute(queries.save_item, (item_id, session,))


def remove_item(item_id, session):
    item_id = sanitize_basket(item_id)
    session = sanitize_basket(session)
    execute(queries.remove_item, (item_id, session,))


def get_items(session):
    session = sanitize_basket(session)
    results = execute(queries.get_items_by_session, (session,))
    return [Item.from_db_row(r) for r in results]
