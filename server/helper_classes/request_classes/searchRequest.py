from pydantic import BaseModel
from typing import Optional


class SearchRequest(BaseModel):
    query: str
    lat: Optional[float] = 43.8
    lng: Optional[float] = -79.5
