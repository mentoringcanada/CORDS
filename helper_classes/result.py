from pydantic import BaseModel
from typing import List
from typing import Optional


class Search(BaseModel):
    text: str


class Item(BaseModel):
    name: str
    description: str
    item_id: str


class SearchResults(BaseModel):
    results: Optional[List[Item]] = None
