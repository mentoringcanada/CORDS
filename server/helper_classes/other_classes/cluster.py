from typing import List
from pydantic import BaseModel
from typing import Optional
from helper_classes.other_classes.itemList import ItemList

class Cluster(BaseModel):
    clusterId: int
    centre: List[float]
    summary: str
    itemList: Optional[ItemList] = ItemList(items=[])

    @classmethod
    def from_db_row(cls, db_row):
        x = db_row['scaled_x']
        y = db_row['scaled_y']
        return Cluster(clusterId=db_row["cluster_id"],
                       centre=[x, y],
                       summary=db_row["summary"] or '')
