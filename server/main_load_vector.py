import pydantic
from typing import Optional, List
from helper_classes.other_classes.session import Session

from fastapi import FastAPI
import startup

app = FastAPI()
vector_model = startup.load_vector()

# Classes:
# Input request
class Text(pydantic.BaseModel):
    text: str

# Output
class Vector(pydantic.BaseModel):
    data: List[float]

@app.post("/")
def session(request: Text):
    output = vector_model(request.text)
    output = [float(y) for x in output for y in x]
    return Vector(data=output)
