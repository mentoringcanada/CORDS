# import 3rd party modules
from helper_classes.other_classes.cluster import Cluster
from helper_classes.other_classes.clusterList import ClusterList
from helper_classes.other_classes.taxonomyList import TaxonomyList
from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.openapi.utils import get_openapi
import os
import sentry_sdk


# import local modules
import controllers
from helper_classes.other_classes.itemList import ItemList
from helper_classes.request_classes.itemIdList import ItemIdList
from helper_classes.other_classes.received import Received
from helper_classes.other_classes.session import Session
from helper_classes.other_classes.basketItem import BasketItem
from helper_classes.request_classes.feedbackRequest import FeedbackRequest
from helper_classes.request_classes.geoSearchRequest import GeoSearchRequest
from helper_classes.request_classes.geoSimilarRequest import GeoSimilarRequest
from helper_classes.request_classes.searchRequest import SearchRequest
from fastapi.responses import HTMLResponse
from services import cluster_explorer


app = FastAPI()


if os.environ['production'] == 'TRUE':
    sentry_sdk.init(
        os.environ['SENTRY_URL'],
        traces_sample_rate=1.0
    )


# CORDS portal

def my_schema():
    """Defining the schema for the openapi.
    """
    if app.openapi_schema:
        # return the openapi schema if it already exists (avoids creating the schema again)
        return app.openapi_schema

    DOCS_TITLE = "The CORDS Endpoints"
    DOCS_VERSION = "1.0"
    openapi_schema = get_openapi(
       title=DOCS_TITLE,
       version=DOCS_VERSION,
       routes=app.routes,
    )
    openapi_schema["info"] = {
       "title" : DOCS_TITLE,
       "version" : DOCS_VERSION,
       "description" : "This contains several endpoints for different GET and POST requests!"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = my_schema


@app.get("/items", response_model=ItemList)
def get_items(request: Request):
    """(EN) See what items you have.\n
    (FR) Voir quels object vous avez."""
    session_token = request.headers.get('session_token')
    results = controllers.get_items(session_token)
    return results


@app.post("/search", response_model=ItemList)
def search(search_request: SearchRequest, request: Request):
    """(EN) Text search through resources and opportunities.\n
    (FR) Chercher a travers les resources et opportunites par texte.
    """
    session_token = request.headers.get('session_token')
    results = controllers.search(
        session_token, search_request)
    return results


@app.get("/similar/{item_id}", response_model=ItemList)
def get_item_by_id(item_id: str, request: Request):
    """(EN) Returns similar resources and opportunities based on description text.
    Also stores the session-item pair in order to make future recommendations.\n
    (FR) Retourne des resources et opportunites selon le texte similier a l'object.
    """
    session_token = request.headers.get('session_token')
    results = controllers.get_similar(
        session_token, item_id)
    return results


@app.post("/geosearch", response_model=ItemList)
def get_geo_search(geo_search_request: GeoSearchRequest, request: Request):
    """(EN) Returns resources and opportunities based on search, geographically constrained.\n
    (FR) Retourne des resources and opportunies selon le texte, proche des coordonees partages.
    """
    session_token = request.headers.get('session_token')
    results = controllers.geo_search(
        session_token, geo_search_request)
    return results


@app.post("/similar", response_model=ItemList)
def get_geo_search(geo_similar_request: GeoSimilarRequest, request: Request):
    """(EN) Returns resources and opportunities based on search, geographically constrained.\n
    (FR) Retourne des resources and opportunies selon le texte, proche des coordonees partages.
    """
    session_token = request.headers.get('session_token')
    results = controllers.geo_similar_search(
        session_token, geo_similar_request)
    return results


@app.post("/feedback", response_model=Received)
def feedback(feedback_data: FeedbackRequest):
    controllers.save_feedback(feedback_data)
    return Received()


# DEMO ENDPOINTS


@app.get("/", response_class=HTMLResponse)
def main_demos_page():
    return open("./views/demo.html", "r").read()


# DEMO API


@app.post("/recommend", response_model=ItemList)
def get_clusters_from_items(itemIdList: ItemIdList):
    results, summaries = controllers.get_recommended_clusters_from_items(
        itemIdList)
    return ItemList(
        items=results,
        suggestedSearches=summaries)


@app.get("/clusters", response_model=ClusterList)
def get_all_clusters():
    clusters = cluster_explorer.get_all_clusters()
    return clusters


@app.get("/cluster/{clusterId}", response_model=Cluster)
def get_cluster(clusterId: int):
    cluster_id = int(clusterId)
    cluster = cluster_explorer.get_cluster(cluster_id)
    return cluster


@app.post("/selections")
def get_recommended_from_selections():
    return None
