from encodings import search_function
import os
from unittest import mock
import numpy as np
# from routes.search import lambda_function

# @pytest.fixture
def test_search_method(mocker):
    mocker.patch('routes.search.controller.external.get_huggingface_vector', return_value=np.random.uniform(-1, 1, 384).tolist())
    # mocker.patch('routes.search.controller.external.search_cache', return_value=[['a'] * 10, range(10)])
    from routes.search import lambda_function    
    response = lambda_function.lambda_handler(
        {'query': 'finance'},
        ''
    )
    
    assert response['statusCode'] == 200