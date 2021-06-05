# import 3rd party modules
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

# import local
import recommendation_testing


app = FastAPI()


@app.get("/taxonomies")
def get_taxonomies():
    results = recommendation_testing.get_taxonomies()
    return {"items": results}


@app.get("/", response_class=HTMLResponse)
def interface():
    return open("interface.html", "r").read()


@app.get("/recommendations")
def get_clusters_from_taxonomies(items: str = ''):
    print(items)
    results = recommendation_testing.get_recommended_clusters_from_taxonomies(items)
    return {"clusters": results}
