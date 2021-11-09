from fastapi import FastAPI
import startup
import numpy as np
import pydantic
from typing import Optional, List
from services import converters

app = FastAPI()
app_state = startup.cache_vectors()

# Input
class Vector(pydantic.BaseModel):
    data: List[float]

# Output
class ResultIDs(pydantic.BaseModel):
    data: List[str]

@app.post("/")
def session(request: Vector):
    vector = np.asarray(request.data)
    vectors = np.asarray([vector]).astype(np.float32)
    distances, indexes = app_state.cache.search(vectors, 10)
    indexes = indexes[0]
    result_IDs = converters.items2str(indexes, app_state.index_to_ID)
    return ResultIDs(data=result_IDs)
