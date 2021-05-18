from pydantic import BaseModel
from typing import Optional


class GeoSearchRequest(BaseModel):
    query: str
    lat: float
    lng: float
    distance: Optional[float] = 25