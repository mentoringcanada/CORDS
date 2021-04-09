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
    Chercher a travers les resources et opportunites par texte.
    """
    results = controllers.search(session_token, search_request, app_state, vector_model)
    return {"items": results}


@app.get("/similar/{item_id}")
def get_item_by_id(item_id: str, session_token: Optional[str] = Header(None)):
    """(EN) Returns similar resources and opportunities based on description text.
    Also stores the session-item pair in order to make future recommendations.
    (FR) Retourne des resources et opportunites selon le texte similier a l'object.
    Aussi sauve les donnees du pair session-object pour ameliorer les recommendations.
    """
    results = controllers.get_similar(session_token, item_id, app_state, vector_model)
    return {"items": results}
