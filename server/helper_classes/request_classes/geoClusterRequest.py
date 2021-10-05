from pydantic import BaseModel
from typing import List
from typing import Optional


class GeoClusterRequest(BaseModel):
    services: List[str]
    lat: float
    lng: float
    distance: Optional[float] = 25
    page: Optional[int] = 1
    size: Optional[int] = 10
