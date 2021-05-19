"These tests are not tests yet but they print the outputs and that's nice."

import requests

# SERVER = 'http://localhost:8000'
SERVER = 'https://server.cordsconnect.ca'


def test_search():
    response = requests.post(SERVER + '/search', json={
        'query': 'i need clothes for an interview'
    })
    data = response.json()
    assert len(data['items']) == 10


def test_similar():
    response = requests.get(SERVER + '/similar/69795365')
    data = response.json()
    assert len(data['items']) == 10


def test_geo_similar():
    response = requests.post(SERVER + '/similar', json={
        'item_id': '69795365',
        'lat': 43.5,
        'lng': -79.5
    })
    data = response.json()
    assert len(data['items']) <= 10
    assert data['items'][0]['item_id'] == '69795365'


def test_geo_search():
    response = requests.post(SERVER + '/geosearch', json={
        'query': 'i need clothes for an interview',
        'lat': 43.5,
        'lng': -79.5,
        'distance': 50
    })
    data = response.json()
    assert len(data['items']) == 10


# test_search()
# test_similar()
test_geo_similar()
test_geo_search()