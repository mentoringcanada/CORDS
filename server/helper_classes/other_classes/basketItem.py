from uuid import uuid4
from pydantic import BaseModel

class BasketItem(BaseModel):
    item_id: str
