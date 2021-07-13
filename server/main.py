# import 3rd party modules
import requests
from helper_classes.other_classes.cluster import Cluster
from helper_classes.other_classes.clusterList import ClusterList
from helper_classes.other_classes.taxonomyList import TaxonomyList
from fastapi import FastAPI
from fastapi.requests import Request
import os
import sentry_sdk
from typing import Optional


# import local modules
import controllers
from helper_classes.other_classes.itemList import ItemList
from helper_classes.other_classes.received import Received
from helper_classes.other_classes.session import Session
from helper_classes.other_classes.basketItem import BasketItem
from helper_classes.request_classes.feedbackRequest import FeedbackRequest
from helper_classes.request_classes.geoSearchRequest import GeoSearchRequest
from helper_classes.request_classes.geoSimilarRequest import GeoSimilarRequest
from helper_classes.request_classes.searchRequest import SearchRequest
import startup
from fastapi.responses import HTMLResponse
from fastapi import Header
from services import cluster_explorer
from services import cluster_recommendations


app = FastAPI()
app_state, vector_model = startup.load()


if os.environ['production'] == 'TRUE':
    sentry_sdk.init(
        os.environ['SENTRY_URL'],
        traces_sample_rate=1.0
    )


# CORDS portal

@app.post("/session", response_model=Session)
def session():
    """Create a new session.
    Creer une nouvelle session.
    """
    return Session()


@app.post("/add_item", response_model=Received)
def add_item(basket_item: BasketItem, request: Request):
    """Adds item to session's basket.
    Ajoute objet au panier du session."""
    session_token = request.headers.get('session_token')
    controllers.add_item(basket_item, session_token)
    return Received()


@app.post("/remove_item", response_model=Received)
def remove_item(basket_item: BasketItem, request: Request):
    """Removes item from session's basket.
    Supprime un objet du panier du session."""
    session_token = request.headers.get('session_token')
    controllers.remove_item(basket_item, session_token)
    return Received()


@app.get("/items", response_model=ItemList)
def get_items(request: Request):
    """See what items you have.
    Voir quels object vous avez."""
    session_token = request.headers.get('session_token')
    results = controllers.get_items(session_token)
    return results


@app.post("/search", response_model=ItemList)
def search(search_request: SearchRequest, request: Request):
    """Text search through resources and opportunities.
    Chercher a travers les resources et opportunites par texte.
    """
    session_token = request.headers.get('session_token')
    results = controllers.search(
        session_token, search_request, app_state, vector_model)
    return results


@app.get("/similar/{item_id}", response_model=ItemList)
def get_item_by_id(item_id: str, request: Request):
    """(EN) Returns similar resources and opportunities based on description text.
    Also stores the session-item pair in order to make future recommendations.
    (FR) Retourne des resources et opportunites selon le texte similier a l'object.
    """
    session_token = request.headers.get('session_token')
    results = controllers.get_similar(
        session_token, item_id, app_state, vector_model)
    return results


@app.post("/geosearch", response_model=ItemList)
def get_geo_search(geo_search_request: GeoSearchRequest, request: Request):
    """(EN) Returns resources and opportunities based on search, geographically constrained.
    (FR) Retourne des resources and opportunies selon le texte, proche des coordonees partages.
    """
    session_token = request.headers.get('session_token')
    results = controllers.geo_search(
        session_token, geo_search_request, app_state, vector_model)
    return results


@app.post("/similar", response_model=ItemList)
def get_geo_search(geo_similar_request: GeoSimilarRequest, request: Request):
    """(EN) Returns resources and opportunities based on search, geographically constrained.
    (FR) Retourne des resources and opportunies selon le texte, proche des coordonees partages.
    """
    session_token = request.headers.get('session_token')
    results = controllers.geo_similar_search(
        session_token, geo_similar_request, app_state)
    return results


@app.post("/feedback", response_model=Received)
def feedback(feedback_data: FeedbackRequest):
    controllers.save_feedback(feedback_data)
    return Received()


# DEMO ENDPOINTS


@app.get("/", response_class=HTMLResponse)
def main_demos_page():
    return open("./views/demo.html", "r").read()


@app.get("/scripts/winbox.js", response_class=HTMLResponse)
def main_demos_page():
    return open("./static/winbox.js", "r").read()


# DEMO API

@app.get("/taxonomies", response_model=TaxonomyList)
def get_all_taxonomies():
    results = cluster_recommendations.get_all_taxonomies()
    return results


@app.get("/recommendations", response_model=ClusterList)
def get_clusters_from_taxonomies(items: str = ''):
    results = controllers.get_recommended_clusters_from_taxonomies(
        items)
    return results


@app.get("/clusters", response_model=ClusterList)
def get_all_clusters():
    clusters = cluster_explorer.get_all_clusters()
    return clusters


@app.get("/cluster", response_model=Cluster)
def get_cluster(clusterId: int):
    cluster_id = int(clusterId)
    cluster = cluster_explorer.get_cluster(cluster_id)
    return cluster


@app.post("/selections")
def get_recommended_from_selections():
    return None
