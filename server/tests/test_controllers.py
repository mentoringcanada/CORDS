from numpy.lib.shape_base import apply_over_axes
import controllers
from helper_classes.request_classes.geoSearchRequest import GeoSearchRequest
from helper_classes.request_classes.geoSimilarRequest import GeoSimilarRequest
from helper_classes.request_classes.searchRequest import SearchRequest
from tests.mocks import app_state
from tests.mocks.app_state import AppState
from tests.mocks.vector_model import vectorizer
from tests.mocks import model


controllers.model = model
app_state = AppState()


def test_search():
    "We will test the seach function. It calls the right data"
    session_token = '12345'
    search_request = SearchRequest(
        query="I need food."
    )
    output = controllers.search(
        session_token,
        search_request,
        app_state,
        vectorizer
    )
    assert output['items'] == ['get_results'] * search_request.size


def test_search_size():
    "We will test the seach function. It calls the right data"
    session_token = '12345'
    search_request = SearchRequest(
        query="I need food.",
        size=11
    )
    output = controllers.search(
        session_token,
        search_request,
        app_state,
        vectorizer
    )
    assert output['items'] == ['get_results'] * 11


def test_geo_search_size():
    "We will test the seach function. It calls the right data"
    session_token = '12345'
    search_request = SearchRequest(
        query="I need food.",
        size=12
    )
    output = controllers.search(
        session_token,
        search_request,
        app_state,
        vectorizer
    )
    assert output['items'] == ['get_results'] * 12


def test_geo_search():
    "We will test the geo_seach function. It calls the right data"
    session_token = '12345'
    search_request = GeoSearchRequest(
        query="I need food.",
        lat=1,
        lng=2
    )
    output = controllers.geo_search(
        session_token,
        search_request,
        app_state,
        vectorizer
    )
    assert output['items'] == ['get_constrained_results'] * 10


def test_get_similar():
    "We will test the get_similar function. It gets the same data as search"
    session_token = '12345'
    item_id = 'abcdef'
    output = controllers.get_similar(
        session_token,
        item_id,
        app_state,
        vectorizer
    )
    assert output['items'] == ['get_results'] * 10


def test_get_geo_similar():
    "We will test the get_similar function. It gets the same data as search"
    session_token = '12345'
    search_request = GeoSimilarRequest(
        item_id="item id",
        lat=1,
        lng=2
    )
    output = controllers.geo_similar_search(
        session_token,
        search_request,
        app_state
    )
    assert output['items'] == ['get_constrained_results'] * 10
