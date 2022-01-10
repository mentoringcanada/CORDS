import pinecone
import os

pinecone.init(api_key=os.environ['API_KEY_PINECONE'],
              environment=os.environ['ENV_PINECONE'])

def get_dimensions():
    """Gets the dimensions required for creating pinecone index based on the vector service type.
    384 for HuggingFace vector service,
    512 for the other.
    """
    if (os.environ['VECTOR_SERVICE_TYPE'] == 'HF'):
        return 384
    else:
        return 512

def create_index(index_name):
    # Delete the index, if an index of the same name already exists
    if index_name in pinecone.list_indexes():
        return False
        # delete_index(index_name)
    pinecone.create_index(
        name=index_name, dimension=get_dimensions(), metric="cosine", shards=1)
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
