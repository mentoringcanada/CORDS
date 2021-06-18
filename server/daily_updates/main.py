import os
import pull_from_211
import update_vectors



if __name__ == '__main__':
    API_KEY = os.environ['API_KEY_211']
    psql_connection_string = os.environ['PSQL_CONNECT_STR']
    pull_from_211.update_language('en', API_KEY)
    pull_from_211.update_language('fr', API_KEY)
    update_vectors.fill_outdated_vector_descriptions(psql_connection_string)
