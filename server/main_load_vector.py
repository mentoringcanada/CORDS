import pydantic
from typing import Optional, List
from helper_classes.other_classes.session import Session

from fastapi import FastAPI
import startup

app = FastAPI()
model = startup.load_model()

# Classes:
# Input request
class Text(pydantic.BaseModel):
    text: str

# Output
class Vector(pydantic.BaseModel):
    data: List[float]

@app.post("/vectorize")
def session(request: Text):
    output = model(request.text)
    output = [float(y) for x in output for y in x]
    return Vector(data=output)
