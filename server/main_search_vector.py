from helper_classes.other_classes.appState import AppState
from fastapi import FastAPI
import startup
import numpy as np
import pydantic
from typing import Optional, List, Any
from services import converters, pinecone_ops

app = FastAPI()
index = startup.cache_vectors()

# Input
class Vector(pydantic.BaseModel):
    data: List[float]

# Output
class ResultIDs(pydantic.BaseModel):
    data: List[str]
    distances: List[float]
    
def get_result_IDs_and_distances(queried_data):
    ids, distances = [], []
    for matches in queried_data['results']:
        for match in matches['matches']:
            ids.append("'" + match['id'] + "'")
            distances.append(match['score'])
    return ids, distances

@app.post("/search")
def session(request: Vector):
    # vector = np.asarray(request.data)
    # vectors = np.asarray([request.data]).astype(np.float32)
    # number_of_results = 5000
    # distances, indexes = app_state.cache.search(vectors, number_of_results)
    # indexes = indexes[0]
    # distances = distances[0].tolist()
    # result_IDs = converters.items2str(indexes, app_state.index_to_ID)
    # print(result_IDs)
    # return ResultIDs(data=result_IDs, distances=distances)

    number_of_results = 10
    queried_data = pinecone_ops.query_from_index(index, request.data, number_of_results)
    result_IDs, distances = get_result_IDs_and_distances(queried_data)
    return ResultIDs(data=result_IDs, distances=distances)
