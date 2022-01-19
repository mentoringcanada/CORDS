import main_huggingface_load_vector
import main_search_vector

hf_load_vector = main_huggingface_load_vector()
search_vector = main_search_vector()

def get_huggingface_vector(text):
    return hf_load_vector.session(text)

def search_cache(vector):
    return search_vector.session(vector)
