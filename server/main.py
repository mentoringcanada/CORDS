# import 3rd party modules
from fastapi import FastAPI
from fastapi import Header
from typing import Optional

# import local modules
import controllers
from helper_classes import result
import startup


app = FastAPI()
app_state, vector_model = startup.load()


@app.post("/search")
def search(search_request: result.SearchRequest, session_token: Optional[str] = Header(None)):
    """Text search through resources and opportunities.

    Args:
        q (str): text to use in search
    """
    results = controllers.search(session_token, search_request, app_state, vector_model)
    return {"items": results}


@app.post("/similar/{item_id}")
def get_item_by_id(item_id: str, session_token: Optional[str] = Header(None)):
    """Returns similar resources and opporunities based on description text.
    Also stores the session-item pair in order to make future recommendations.

    Args:
        item_id (str): the item's ID
    """
    results = controllers.get_similar(session_token, item_id, app_state, vector_model)
    return {"items": results}
