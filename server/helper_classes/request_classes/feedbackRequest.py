from pydantic import BaseModel
from typing import Optional


class FeedbackRequest(BaseModel):
    query: str
    item_id: str
    sortOrder: str
    msg: str
    type: str
