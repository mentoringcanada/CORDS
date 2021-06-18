from pydantic import BaseModel
from typing import Optional


class Received(BaseModel):
    status: Optional[bool] = True
