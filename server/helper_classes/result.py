from faiss import IndexFlatL2
from pydantic import BaseConfig
from pydantic import BaseModel
from pydantic import Field
from typing import Dict
from typing import List
from typing import Optional


class Item(BaseModel):
    name: str = 'test'
    description: str = 'description'
    item_id: str
    lat: Optional[float] = 0
    lng: Optional[float] = 0
    address: str
    link: str

    class Config:
        allow_population_by_field_name = True


class SearchRequest(BaseModel):
    query: str
    lat: Optional[float] = 0
    lng: Optional[float] = 0


class AppState(BaseModel):
    items: Dict[str, Item]
    index_to_ID: List[str]
    cache: Optional[IndexFlatL2] = None

    class Config(BaseConfig):
        arbitrary_types_allowed = True


class LinkOut(BaseModel):
    item_id: str
