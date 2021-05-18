from pydantic import BaseConfig
from pydantic import BaseModel
from typing import List
from typing import Optional
from faiss import IndexFlatL2


class AppState(BaseModel):
    index_to_ID: List[str]
    cache: Optional[IndexFlatL2] = None

    class Config(BaseConfig):
        arbitrary_types_allowed = True