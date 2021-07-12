from uuid import uuid4
from pydantic import BaseModel

class Session(BaseModel):
    session_token: str

    def __init__(self):
        self.session_token = uuid4().hex
