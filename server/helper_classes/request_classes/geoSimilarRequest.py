from pydantic import BaseModel
from typing import Optional


class GeoSimilarRequest(BaseModel):
    item_id: str
    lat: float
    lng: float
    distance: Optional[float] = 25