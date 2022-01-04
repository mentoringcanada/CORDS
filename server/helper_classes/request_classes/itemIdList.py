from pydantic import BaseModel
from typing import List
from typing import Optional


class ItemIdList(BaseModel):
    items: List[str]
    lat: Optional[float]
    lng: Optional[float]
    distance: Optional[float] = 100
    community_services: Optional[bool] = True
    employment: Optional[bool] = False
    volunteer: Optional[bool] = False
