import pinecone

pinecone.init(api_key="cba50e6f-1934-49a6-94f9-04e59805ba65",
              environment="us-west1-gcp")


def create_index(index_name):
    # Delete the index, if an index of the same name already exists
    if index_name in pinecone.list_indexes():
        # return False
        delete_index(index_name)
    dimensions = 1
    pinecone.create_index(
        name=index_name, dimension=dimensions, metric="cosine", shards=1)
    index = pinecone.Index(index_name=index_name)
    return index

def connect_to_index(index_name):
    return pinecone.Index(index_name=index_name)

def delete_index(index_name):
    pinecone.delete_index(index_name)


def insert_to_index(index, ids, vectors):
    index.upsert(vectors=zip(ids, vectors))


def query_from_index(index, vectors, number_of_results):
    return index.query(queries=vectors, top_k=number_of_results, include_values=True)
