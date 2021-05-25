from pydantic import BaseModel
from typing import List
from helper_classes.other_classes.item import Item


class ItemList(BaseModel):
    items: List[Item]
