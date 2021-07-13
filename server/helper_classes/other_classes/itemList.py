from pydantic import BaseModel
from typing import List
from typing import Optional
from helper_classes.other_classes.item import Item


class ItemList(BaseModel):
    items: List[Item]
    totalResults: Optional[int]
