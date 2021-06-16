from pydantic import BaseModel
from typing import List
from helper_classes.other_classes import taxonomy
from helper_classes.other_classes.taxonomy import Taxonomy


class TaxonomyList(BaseModel):
    taxonomies: List[Taxonomy]
