from helper_classes.other_classes.appState import AppState
import model
import numpy as np
from services import cache
from services import nlp_model
from services import converters
from services import pinecone_ops


def load():
    print('loading NLP model')
    vector_model = nlp_model.load_model()
    print('loaded')

    print('loading app state')
    vectors_and_IDs = model.get_all_vectors()
    cache.load_index()
    vectors = np.asarray([converters.textvec2vec(row['description_vector']) for row in vectors_and_IDs])
    index = cache.add_vectors(vectors)
    app_state = AppState(
        index_to_ID=[row['resource_agency_number'] for row in vectors_and_IDs],
        cache=index)
    print('loaded app state')
    return app_state, vector_model

def load_vector():
    print('loading NLP model')
    vector_model = nlp_model.load_model()
    print('loaded')
    return vector_model

def cache_vectors():
    # print('caching vectors')
    # vectors_and_IDs = model.get_all_vectors()
    # cache.load_index()
    # vectors = np.asarray([converters.textvec2vec(row['description_vector']) for row in vectors_and_IDs])
    # index = cache.add_vectors(vectors)
    # print('cached vectors')
    # app_state = AppState(
    #     index_to_ID=[row['resource_agency_number'] for row in vectors_and_IDs],
    #     cache=index)
    # return app_state
    print('caching vectors')
    index = pinecone_ops.create_index("cordscache")
    print(1)
    # if not index:   # index name is already available
    #     print('index already available')
    #     return pinecone_ops.connect_to_index("cordscache")
    vectors_and_IDs = model.get_all_vectors()
    vectors = [row['description_vector'] for row in vectors_and_IDs]
    ids = [row['resource_agency_number'] for row in vectors_and_IDs]
    print('batch 1: 10000 size')
    pinecone_ops.insert_to_index(index, ids[:10000], vectors[:10000])
    print('batch 2: remaining')
    pinecone_ops.insert_to_index(index, ids[10000:20000], vectors[10000:20000])
    print('batch 3: remaining')
    pinecone_ops.insert_to_index(index, ids[20000:30000], vectors[20000:30000])
    print('batch 4: 40000 size')
    pinecone_ops.insert_to_index(index, ids[30000:40000], vectors[30000:40000])
    print('batch 5: remaining')
    pinecone_ops.insert_to_index(index, ids[40000:50000], vectors[40000:50000])
    print('batch 6: remaining')
    pinecone_ops.insert_to_index(index, ids[50000:], vectors[50000:])
    print('cached vectors')
    return index

