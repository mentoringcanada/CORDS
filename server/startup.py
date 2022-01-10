from helper_classes.other_classes.appState import AppState
import model
import numpy as np
from services import cache
from services import nlp_model
from services import converters
from services import pinecone_ops
from sentence_transformers import SentenceTransformer
import os

pinecone_index = os.environ["PINECONE_INDEX"]


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

def load_model():
    print('loading NLP model')
    model = nlp_model.load_model()
    print('loaded')
    return model

def load_huggingface_model():
    print('loading hugging face paraphrase-multilingual-MiniLM-L12-v2 model')
    model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    print('loaded')
    return model

def cache_vectors():
    print('caching vectors')
    index = pinecone_ops.create_index(pinecone_index)
    if not index:   # index name is already available
        print('index already available')
        return pinecone_ops.connect_to_index(pinecone_index)
    vectors_and_IDs = model.get_all_vectors()
    vectors = [row['description_vector'] for row in vectors_and_IDs]
    ids = [row['resource_agency_number'] for row in vectors_and_IDs]
    print(len(vectors), len(ids))
    increment_amount = 100
    for i in range(0, len(vectors), increment_amount):
        print(f'batch {i}:{i+increment_amount-1}')
        pinecone_ops.insert_to_index(index, ids[i:i+increment_amount], vectors[i:i+increment_amount])
    print('cached vectors')
    return index

