"These tests are not tests yet but they print the outputs and that's nice."

import requests

SERVER = 'http://localhost:8000'
# SERVER = 'http://51.222.139.147'
# SERVER = 'https://server.cordsconnect.ca'

def test_search():
    response = requests.post(SERVER + '/search', json={
        'query': 'i need clothes for an interview'
    })
    data = response.json()
    assert len(data['items']) == 10


def test_similar():
    response = requests.get(SERVER + '/similar/68976436')
    data = response.json()
    assert len(data['items']) == 10


def test_geo_similar():
    response = requests.post(SERVER + '/similar', json={
        'item_id': '69795365',
        'lat': 44.2312,
        'lng': -76.486
    })
    data = response.json()
    assert len(data['items']) <= 10
    assert data['items'][0]['item_id'] == '69795365'


def test_geo_search():
    response = requests.post(SERVER + '/geosearch', json={
        'query': 'bread',
        'lat': 45.5017,
        'lng': -73.5673,
        # 'distance': 50
    })
    data = response.json()
    assert len(data['items']) == 10


# test_search()
# test_similar()
# test_geo_similar()
test_geo_search()
