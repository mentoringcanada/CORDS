import numpy as np
from . import startup
from .services import pinecone_ops
    
def get_result_IDs_and_distances(queried_data):
    ids, distances = [], []
    for matches in queried_data['results']:
        for match in matches['matches']:
            ids.append("'" + match['id'] + "'")
            distances.append(match['score'])
    return ids, distances

def session(vector):
    index = startup.cache_vectors()
    number_of_results = 10
    queried_data = pinecone_ops.query_from_index(index, vector, number_of_results)
    result_IDs, distances = get_result_IDs_and_distances(queried_data)
    return result_IDs, distances

if __name__ == '__main__':
    global index
    index = startup.cache_vectors()