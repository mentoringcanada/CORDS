from pydantic import BaseModel
from typing import List
from helper_classes.other_classes.cluster import Cluster


class ClusterList(BaseModel):
    clusters: List[Cluster]
