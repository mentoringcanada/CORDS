from pydantic import BaseModel
from typing import Optional


class SearchRequest(BaseModel):
    query: str
    lat: Optional[float] = 0
    lng: Optional[float] = 0
    page: Optional[int]
    size: Optional[int] = 10
    cutoff: Optional[float]
