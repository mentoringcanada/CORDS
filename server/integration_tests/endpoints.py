"These tests are not tests yet but they print the outputs and that's nice."

import requests


def test_search():
    response = requests.post('http://localhost:8000/search', json={
        'query': 'i need clothes for an interview'
    })
    print(response.json())


def test_similar():
    response = requests.get('http://localhost:8000/similar/69795486')
    print(response.json())


def test_geo_search():
    response = requests.post('http://localhost:8000/geosearch', json={
        'query': 'i need clothes for an interview',
        'lat': 43.5,
        'lng': -79.5,
        'distance': 50
    })
    print(response.json())



# test_search()
test_similar()
# test_geo_search()