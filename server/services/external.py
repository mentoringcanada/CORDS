import requests
import os

cache_service_url = os.environ['CACHE_SERVICE']
vector_service_url = os.environ['VECTOR_SERVICE']


def get_vector(text):
    response = requests.post(vector_service_url, json={'text': text})
    return response.json()


def search_cache(vector):
    response = requests.post(cache_service_url, json=vector)
    return response.json()

