
import os
import json
import requests
from .. import model
from .services import pinecone_ops
import time

pinecone_index = os.environ["PINECONE_INDEX"]
huggingface_api_token = os.environ["HUGGINGFACE_API_TOKEN"]


def query_huggingface(text):
    # data = json.loads(text)
    # text = {
    #     'source_sentence': text,
    #     'sentences': [text, 'hi']
    # }
    headers = {"Authorization": f"Bearer {huggingface_api_token}"}
    API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/multi-qa-MiniLM-L6-cos-v1"
    response = requests.post(API_URL, headers=headers, json=text)
    time.sleep(25)
    print(response.json())
    return response.json()


def cache_vectors():
    print('caching vectors')
    index = pinecone_ops.create_index(pinecone_index)
    if not index:   # index name is already available
        print('index already available')
        pinecone_ops.delete_index(pinecone_index)
        print('index deleted')
        return
        return pinecone_ops.connect_to_index(pinecone_index)
    # vectors_and_IDs = model.get_all_vectors()
    # vectors = [row['description_vector'] for row in vectors_and_IDs]
    # ids = [row['resource_agency_number'] for row in vectors_and_IDs]
    import numpy as np
    vectors = [np.random.uniform(-1, 1, 384).tolist(), np.random.uniform(-1, 1, 384).tolist(), np.random.uniform(-1, 1, 384).tolist()]
    ids = ['1', '2', '3']
    print(len(vectors), len(ids))
    # increment_amount = 100
    # for i in range(0, len(vectors), increment_amount):
    #     print(f'batch {i}:{i+increment_amount-1}')
        # pinecone_ops.insert_to_index(index, ids[i:i+increment_amount], vectors[i:i+increment_amount])
    pinecone_ops.insert_to_index(index, ids, vectors)
    print('cached vectors')
    return index

