import os

def pytest_generate_tests(metafunc):
    os.environ['API_KEY_PINECONE'] = '1'