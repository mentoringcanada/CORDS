"These tests are not tests yet but they print the outputs and that's nice."
import json
import requests


SERVER = 'http://localhost:8000'
# SERVER = 'http://51.222.139.147'
# SERVER = 'https://server.cordsconnect.ca'


# sample_element = None


def test_search(search_term='health care'):
    response = requests.post(SERVER + '/search', json={
        'query': search_term,
        'employment': True,
        'community_services': True,
        'lat': 43.7,
        'lng': -79.7
    })
    data = response.json()
    assert len(data['items']) == 10
    # global sample_element
    # sample_element = data['items'][0]['item_id']
    return json.dumps(data)


def test_similar(item_id='71087870'):
    response = requests.get(SERVER + '/similar/' + item_id)
    data = response.json()
    assert len(data['items']) == 10
    return json.dumps(data)


def test_geo_similar(item_id='73443253'):
    response = requests.post(SERVER + '/similar', json={
        "item_id": item_id,
        "lat": 43.6603315,
        "lng": -79.4552396,
        "distance": 100,
        "size": 1,
        "community_services": False,
        "employment": True,
        "volunteer": False
    })
    data = response.json()
    assert len(data['items']) <= 10
    # assert data['items'][0]['item_id'] == sample_element
    return json.dumps(data)


def test_geo_search(search_term='data analyst'):
    response = requests.post(SERVER + '/geosearch', json={
        'query': search_term,
        'lat': 44.5017,
        'lng': -79.5673,
        'distance': 500,
        'employment': True,
        'community_services': False
    })
    data = response.json()
    assert len(data['items']) == 10
    return json.dumps(data)


def test_geo_search_pages():
    response = requests.post(SERVER + '/geosearch', json={
        'query': 'bread',
        'lat': 44.5017,
        'lng': -79.5673,
        'page': 1
    })
    data = response.json()
    assert len(data['items']) == 10
    item_1 = data['items'][0]['item_id']
    response = requests.post(SERVER + '/geosearch', json={
        'query': 'bread',
        'lat': 44.5017,
        'lng': -79.5673,
        'page': 2
    })
    data = response.json()
    assert item_1 != data['items'][0]['item_id']
    return json.dumps(data)


def test_geo_similar_search_pages():
    response = requests.post(SERVER + '/geosearch', json={
        'query': 'bread',
        'lat': 43.5017,
        'lng': -79.5673,
        'page': 1
    })
    data = response.json()
    item_id = data['items'][0]['item_id']
    response = requests.post(SERVER + '/similar', json={
        'item_id': item_id,
        'lat': 43.5017,
        'lng': -79.5673,
        'distance': 250,
        'page': 1
    })
    data = response.json()
    assert len(data['items']) == 10
    item_1 = data['items'][0]['item_id']
    response = requests.post(SERVER + '/similar', json={
        'item_id': item_id,
        'lat': 43.5017,
        'lng': -79.5673,
        'page': 2
    })
    data = response.json()
    assert item_1 != data['items'][0]['item_id']
    return json.dumps(data)


def test_add_remove_basket():
    item_id = '70210584'
    session_token = '54321'
    response = requests.post(SERVER + '/add_item', json={
        'item_id': item_id
    }, headers={
        'session_token': session_token
    })
    assert response.json()['status']
    response = requests.get(
        SERVER + '/items', headers={'session_token': session_token})
    response = requests.post(SERVER + '/remove_item', json={
        'item_id': item_id
    }, headers={
        'session_token': session_token
    })
    assert response.json()['status']
    return json.dumps(response.json())


def test_recommend(items=['70089785']):
    response = requests.post(SERVER + '/recommend', json={
        'items': items,
        'community_services': True,
        'employment': True,
        'lat': 43.8,
        'lng': -79.5,
        'distance': 5000
    })
    assert len(response.json()['items']) == 50
    return json.dumps(response.json())


# print(test_geo_search("Data analyst"))
print(test_geo_similar())

# items = ['626084835', '626071976']
# print(test_recommend(items))


# print(test_search('health care'))
# print(test_similar())
# print(test_geo_search_pages())
# print(test_geo_similar_search_pages())
# print(test_add_remove_basket())

# print('no errors!')


# test_geo_search("Data analyst")
# test_geo_similar("626084835")

# items = ['626084835', '626071976']
# test_recommend(items)


# test_search('health care')
# test_similar()
# test_geo_search_pages()
# test_geo_similar_search_pages()
# test_add_remove_basket()

# print('no errors!')
