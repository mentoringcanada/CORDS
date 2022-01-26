
import os
import json
import model
import requests
from services import pinecone_ops

pinecone_index = os.environ["PINECONE_INDEX"]
hugging_face_api_token = os.environ["HUGGING_FACE_API_TOKEN"]


def query_huggingface(text):
    data = json.dumps(text)
    headers = {"Authorization": f"Bearer {hugging_face_api_token}"}
    API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()


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

