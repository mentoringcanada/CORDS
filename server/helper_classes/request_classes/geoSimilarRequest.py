from pydantic import BaseModel
from typing import Optional


class GeoSimilarRequest(BaseModel):
    item_id: str
    lat: float
    lng: float
    distance: Optional[float] = 25
    page: Optional[int] = 1
    size: Optional[int] = 10
    cutoff: Optional[float]
    community_services: Optional[bool] = True
    employment: Optional[bool] = False
    volunteer: Optional[bool] = False
