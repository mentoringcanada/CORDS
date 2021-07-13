from uuid import uuid4
from typing import Optional
from pydantic import BaseModel


class Session(BaseModel):
    session_token: Optional[str]

    def __init__(self, session_token=uuid4().hex):
        super().__init__(session_token=session_token)
