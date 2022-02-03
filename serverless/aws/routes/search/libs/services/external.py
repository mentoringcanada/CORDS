from .. import main_huggingface_load_vector
from .. import main_search_vector

def get_huggingface_vector(text):
    return main_huggingface_load_vector.session(text)

def search_cache(vector):
    return main_search_vector.session(vector)
