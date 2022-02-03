import os
import pinecone

pinecone.init(api_key=os.environ['API_KEY_PINECONE'],
              environment=os.environ['ENV_PINECONE'])

def create_index(index_name):
    # Delete the index, if an index of the same name already exists
    if index_name in pinecone.list_indexes():
        return False
        # delete_index(index_name)
    pinecone.create_index(
        name=index_name, dimension=384, metric="cosine", shards=1)
    index = pinecone.Index(index_name=index_name)
    return index

def connect_to_index(index_name):
    return pinecone.Index(index_name=index_name)

def delete_index(index_name):
    pinecone.delete_index(index_name)

def insert_to_index(index, ids, vectors):
    index.upsert(vectors=zip(ids, vectors))

def query_from_index(index, vectors, number_of_results):
    return index.query(queries=[vectors], top_k=number_of_results, include_values=True)
