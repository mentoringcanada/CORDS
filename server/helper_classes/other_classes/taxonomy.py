from pydantic import BaseModel
from typing import Optional


class Taxonomy(BaseModel):
    taxonomyCode: str
    taxonomyName: str

    @classmethod
    def from_db_row(cls, db_row):
        return Taxonomy(taxonomyCode=db_row['taxonomy_code'],
                        taxonomyName=db_row['taxonomy_name'])
