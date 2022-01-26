
import os
os.environ['API_KEY_PINECONE'] = 'test'
os.environ['ENV_PINECONE'] = 'test'
os.environ['PINECONE_INDEX'] = 'test'
os.environ['HUGGING_FACE_API_TOKEN'] = 'test'
from search import lambda_function as search_entry


def mock_vectorize(text): return [0]*384
def mock_search_cache(vector): return range(10), range(10)


# def mock_query_huggingface
search_entry.controller.external.get_huggingface_vector = mock_vectorize
search_entry.controller.external.search_cache = mock_search_cache
# search_entry.controller.external.main_huggingface_load_vector.startup.query_huggingface =


def test_search():
    event = {
        'query': 'mocked'
    }
    print(search_entry.lambda_handler(event, None))