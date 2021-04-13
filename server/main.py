# import 3rd party modules
from fastapi import FastAPI
from fastapi import Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from os import environ
from typing import Optional

# import local modules
import controllers
from helper_classes import result
import middleware
import startup


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=middleware.get_acceptable_origins_for_cors(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PRODUCTION = environ.get('production', False)


app_state, vector_model = startup.load(PRODUCTION)


@app.middleware("http")
async def maintain_session_ip_link(request: Request, call_next):
    middleware.update_ip(request.client.host, request.headers.get('session_token'))
    response = await call_next(request)
    return response


@app.options("/options")
async def options():
    return {'ok': True}


@app.post("/search")
async def search(search_request: result.SearchRequest, session_token: Optional[str] = Header(None)):
    """Text search through resources and opportunities.
    Chercher a travers les resources et opportunites par texte.
    """
    results = controllers.search(session_token, search_request, app_state, vector_model)
    return {"items": results}


@app.get("/similar/{item_id}")
async def get_item_by_id(item_id: str, session_token: Optional[str] = Header(None)):
    """(EN) Returns similar resources and opportunities based on description text.
    Also stores the session-item pair in order to make future recommendations.
    (FR) Retourne des resources et opportunites selon le texte similier a l'object.
    Aussi sauve les donnees du pair session-object pour ameliorer les recommendations.
    """
    results = controllers.get_similar(session_token, item_id, app_state, vector_model)
    return {"items": results}


@app.get("/session")
async def get_session(request: Request):
    client_host = request.client.host
    session_token = controllers.get_session(client_host)
    return {"session_token": session_token}


@app.post("/link_out")
async def link_out(link_out: result.LinkOut, session_token: Optional[str] = Header(None)):
    controllers.link_out(link_out, session_token)
    return True
