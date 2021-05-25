# import 3rd party modules
from fastapi import FastAPI
from fastapi import Header
import os
import sentry_sdk
from typing import Optional


# import local modules
import controllers
from helper_classes.other_classes.itemList import ItemList
from helper_classes.request_classes.geoSearchRequest import GeoSearchRequest
from helper_classes.request_classes.geoSimilarRequest import GeoSimilarRequest
from helper_classes.request_classes.searchRequest import SearchRequest
import startup


app = FastAPI()
app_state, vector_model = startup.load()


if os.environ['production'] == True:
    sentry_sdk.init(
        os.environ['SENTRY_URL'],
        traces_sample_rate=1.0
    )


@app.post("/search", response_model=ItemList)
def search(search_request: SearchRequest, session_token: Optional[str] = Header(None)):
    """Text search through resources and opportunities.
    Chercher a travers les resources et opportunites par texte.
    """
    results = controllers.search(
        session_token, search_request, app_state, vector_model)
    return {"items": results}


@app.get("/similar/{item_id}", response_model=ItemList)
def get_item_by_id(item_id: str, session_token: Optional[str] = Header(None)):
    """(EN) Returns similar resources and opportunities based on description text.
    Also stores the session-item pair in order to make future recommendations.
    (FR) Retourne des resources et opportunites selon le texte similier a l'object.
    """
    results = controllers.get_similar(
        session_token, item_id, app_state, vector_model)
    return {"items": results}


@app.post("/geosearch", response_model=ItemList)
def get_geo_search(geo_search_request: GeoSearchRequest, session_token: Optional[str] = Header(None)):
    """(EN) Returns resources and opportunities based on search, geographically constrained.
    (FR) Retourne des resources and opportunies selon le texte, proche des coordonees partages.
    """
    results = controllers.geo_search(
        session_token, geo_search_request, app_state, vector_model)
    return {"items": results}


@app.post("/similar", response_model=ItemList)
def get_geo_search(geo_similar_request: GeoSimilarRequest, session_token: Optional[str] = Header(None)):
    """(EN) Returns resources and opportunities based on search, geographically constrained.
    (FR) Retourne des resources and opportunies selon le texte, proche des coordonees partages.
    """
    results = controllers.geo_similar_search(
        session_token, geo_similar_request, app_state, vector_model)
    return {"items": results}
