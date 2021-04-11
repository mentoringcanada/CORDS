import controllers
from helper_classes import result


def test_search():
    "We will test the seach function. Incomplete as of yet"
    session_token = '12345'
    search_request = result.SearchRequest(
        query="I need food."
    )