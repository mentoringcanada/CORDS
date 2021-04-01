# import 3rd party modules
from fastapi import FastAPI
from typing import Optional

# import local modules
from helper_classes import result

app = FastAPI()


@app.get("/search")
def search(q: str):
    return result.SearchResults()


@app.get("/item/{item_id}")
def get_item_by_id(item_id: str):
    return {"item": result.Item()}
