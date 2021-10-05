from pydantic import BaseModel
from typing import List


class ClusterRequest(BaseModel):
    services: List[str]
