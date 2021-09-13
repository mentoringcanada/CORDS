from pydantic import BaseModel
from typing import Optional


class GeoSearchRequest(BaseModel):
    query: str
    lat: float
    lng: float
    distance: Optional[float] = 25
    item_id: Optional[str] = 'None'
    page: Optional[int] = 1
    size: Optional[int] = 10
    cutoff: Optional[float]
