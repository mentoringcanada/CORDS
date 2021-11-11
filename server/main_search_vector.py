from helper_classes.other_classes.appState import AppState
from fastapi import FastAPI
import startup
import numpy as np
import pydantic
from typing import Optional, List, Any
from services import converters

app = FastAPI()
app_state = startup.cache_vectors()

# class NumpyNDArray(np.ndarray):
    # @classmethod
    # def __get_validators__(cls):
    #     yield cls.validate
    # @classmethod
    # def validate(cls, v: Any) -> str:
    #     # validate data...
    #     return v


# Input
class Vector(pydantic.BaseModel):
    data: List[float]

# Output
class ResultIDs(pydantic.BaseModel):
    data: List[str]
    distances: List[float]
    

@app.post("/search")
def session(request: Vector):
    # vector = np.asarray(request.data)
    vectors = np.asarray([request.data]).astype(np.float32)
    number_of_results = 5000
    distances, indexes = app_state.cache.search(vectors, number_of_results)
    indexes = indexes[0]
    distances = distances[0].tolist()
    result_IDs = converters.items2str(indexes, app_state.index_to_ID)
    print(result_IDs)
    return ResultIDs(data=result_IDs, distances=distances)
