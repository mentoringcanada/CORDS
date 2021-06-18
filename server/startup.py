from helper_classes.other_classes.appState import AppState
import model
import numpy as np
from services import cache
from services import nlp_model
from services import converters


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
