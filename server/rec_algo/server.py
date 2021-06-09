# import 3rd party modules
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

# import local
import recommendation_testing


app = FastAPI()


@app.get("/taxonomies")
def get_all_taxonomies():
    results = recommendation_testing.get_all_taxonomies()
    return {"items": results}


@app.get("/methodology", response_class=HTMLResponse)
def main_demos():
    return open("./views/navigation.html", "r").read()


@app.get("/recommendation_demo", response_class=HTMLResponse)
def recommendation_demo():
    return open("./views/rec_demo.html", "r").read()


@app.get("/cluster_explorer", response_class=HTMLResponse)
def cluscluster_explorerters():
    return open("./views/cluster_explorer.html", "r").read()


@app.get("/recommendations")
def get_clusters_from_taxonomies(items: str = ''):
    print(items)
    results = recommendation_testing.get_recommended_clusters_from_taxonomies(items)
    return {"clusters": results}


@app.get("/clusters")
def get_all_clusters():
    clusters = recommendation_testing.get_all_clusters()
    return {"clusters": clusters}


@app.get("/cluster")
def get_all_clusters(clusterId: int):
    cluster_id = int(clusterId)
    cluster = recommendation_testing.get_cluster(cluster_id)
    return cluster
