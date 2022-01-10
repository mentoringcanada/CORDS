"These tests are not tests yet but they print the outputs and that's nice."
import json
import requests

SERVER = 'http://localhost:8000'
# SERVER = 'http://51.222.139.147'
# SERVER = 'https://server.cordsconnect.ca'

# sample_element = None


def test_search(search_term='health care'):
    """Test to search by a search term.
    """
    response = requests.post(SERVER + '/search', json={
        'query': search_term,
        'employment': False,
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
    """Test to find similar items to an item.
    """
    response = requests.get(SERVER + '/similar/' + item_id)
    data = response.json()
    # print(len(data['items']))
    assert len(data['items']) == 10
    return json.dumps(data)


def test_geo_similar(item_id='73443253'):
    """Test geographically similar items.
    """
    response = requests.post(SERVER + '/similar', json={
        "item_id": item_id,
        "lat": 43.6603315,
        "lng": -79.4552396,
        "distance": 100,
        "size": 1,
        "community_services": True,
        "employment": False,
        "volunteer": True
    })
    data = response.json()
    assert len(data['items']) <= 10
    # assert data['items'][0]['item_id'] == sample_element
    return json.dumps(data)


def test_geo_search(search_term='hospital'):
    """Test geosearch.
    """
    response = requests.post(SERVER + '/geosearch', json={
        'query': search_term,
        'lat': 44.5017,
        'lng': -79.5673,
        'distance': 500,
        'employment': False,
        'community_services': True
    })
    data = response.json()
    assert len(data['items']) == 10
    return json.dumps(data)


def test_geo_search_pages():
    """Test to geosearch with multiple pages.
    """
    response = requests.post(SERVER + '/geosearch', json={
        'query': 'hospital',
        'lat': 44.5017,
        'lng': -79.5673,
        'distance': 500,
        'page': 1,
        'community_services': True
    })
    data = response.json()
    assert len(data['items']) == 10
    item_1 = data['items'][0]['item_id']

    response = requests.post(SERVER + '/geosearch', json={
        'query': 'hospital',
        'lat': 44.5017,
        'lng': -79.5673,
        'distance': 500,
        'page': 2,
        'community_services': True,
        'size': 5
    })
    data = response.json()
    assert item_1 != data['items'][0]['item_id']
    return json.dumps(data)


def test_geo_similar_search_pages():
    """Test to find geographically similar items in multiple pages.
    """
    response = requests.post(SERVER + '/geosearch', json={
        'query': 'health',
        'lat': 43.5017,
        'lng': -79.5673,
        'page': 1,
        'distance': 500
    })
    data = response.json()
    item_id = data['items'][0]['item_id']
    response = requests.post(SERVER + '/similar', json={
        'item_id': item_id,
        # 'lat': 43.5017,
        # 'lng': -79.5673,
        # 'distance': 250,
        'page': 1
    })
    data = response.json()
    print(len(data['items']))
    assert len(data['items']) == 10
    item_1 = data['items'][0]['item_id']
    response = requests.post(SERVER + '/similar', json={
        'item_id': item_id,
        # 'lat': 43.5017,
        # 'lng': -79.5673,
        'page': 2
    })
    data = response.json()
    print(item_1, data['items'][1]['item_id'])
    assert item_1 != data['items'][0]['item_id']
    return json.dumps(data)


def test_add_remove_basket():
    """Test to add and remove from basket.
    Adds a new item, and then removes the item.
    """
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
    """Test to recommend items corresponding to input item.
    """
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


def test_items():
    """Test to find all items in basket.
    Adds two items, finds the two items and removes the two items in the end.
    """
    # defining two items.
    item_id_1, item_id_2 = '70210584', '65309113'
    session_token = '54321'
    
    # adding first item.
    response = requests.post(SERVER + '/add_item', json={
        'item_id': item_id_1
    }, headers={
        'session_token': session_token
    })
    assert response.json()['status']
    # adding second item.
    response = requests.post(SERVER + '/add_item', json={
        'item_id': item_id_2
    }, headers={
        'session_token': session_token
    })
    assert response.json()['status']
    
    # finding all items.
    response = requests.get(SERVER + '/items', headers={
        'session_token': session_token
    })
    assert response.json()['totalResults'] == 2
    assert response.json()['items'][0]['item_id'] == item_id_2
    assert response.json()['items'][1]['item_id'] == item_id_1
    
    # removing first item.
    response = requests.post(SERVER + '/remove_item', json={
        'item_id': item_id_1
    }, headers={
        'session_token': session_token
    })
    assert response.json()['status']
    # removing second item.
    response = requests.post(SERVER + '/remove_item', json={
        'item_id': item_id_2
    }, headers={
        'session_token': session_token
    })
    assert response.json()['status']
    return json.dumps(response.json())

def test_feedback():
    """Test to save entries to feedback table.
    """
    response = requests.post(SERVER + '/feedback', json={
        'query': 'query1',
        'item_id': '65309113',
        'sortOrder': 'ascending',
        'msg': 'test feedback',
        'type': 'test'
    })
    assert response.json()['status']

def test_cluster():
    """Test to find items from resources table corresponding to a particular cluster from cluster table.
    """
    cluster_id = '265'
    response = requests.get(SERVER + '/cluster/' + cluster_id)
    assert response.json()['centre'] == [0.0, 1.0]
    assert len(response.json()['itemList']['items']) == 557     # 557 items are found in the cluster 265.


def test_clusters():
    """Test to find all clusters from cluster table.
    """
    response = requests.get(SERVER + '/clusters')
    assert len(response.json()['clusters']) == 301      # there are 301 rows in the cluster table.



########## INVOKING THE TEST METHODS BELOW: ############

# print(test_geo_search("Data analyst"))
# print(test_geo_similar())

# print(test_recommend())

# test_search()
# test_similar()
# print(test_similar())
# print(test_geo_search_pages())
# print(test_geo_similar_search_pages())
# print(test_add_remove_basket())

# print('no errors!')


# test_geo_search("Data analyst")
# test_geo_similar("626084835")

# items = ['626084835', '626071976']
items = ['65309113', '626071976']
test_recommend(items)
test_geo_similar()
test_geo_search()
test_geo_search_pages()
# test_geo_similar_search_pages() #  Nead to test this again!!
# test_items()
test_feedback()
test_cluster()
test_clusters()

test_search('health care')
test_similar()
# #test_geo_search_pages()
# # test_geo_similar_search_pages()
# test_add_remove_basket()

print('no errors!')
