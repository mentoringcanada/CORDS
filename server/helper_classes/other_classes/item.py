from pydantic import BaseModel
from typing import Optional


class Item(BaseModel):
    name: Optional[str]
    description: Optional[str]
    item_id: str
    lat: Optional[float] = 0
    lng: Optional[float] = 0
    address: str
    distance: Optional[float] = None
    link: str
    phone: str
    nom: Optional[str]
    description_fr: Optional[str]
    sortOrder: Optional[int]
    clusterId: Optional[int]

    @classmethod
    def from_db_row(cls, db_row):
        geocoordinates = db_row['geocoordinates'][1:-1].split(',')
        if 'distance' in db_row:
            return Item(name=db_row['public_name'] or '',
                        nom=db_row['nom_publique'] or '',
                        description=db_row['resource_description'] or '',
                        description_fr=db_row['description_francais'] or '',
                        item_id=db_row['resource_agency_number'],
                        lat=float(geocoordinates[0]),
                        lng=float(geocoordinates[1]),
                        distance=db_row['distance'],
                        address=db_row['physical_address'],
                        link=db_row['link'],
                        phone=db_row['phone'],
                        clusterId=db_row['cluster_id'])
        else:
            return Item(name=db_row['public_name'] or '',
                        nom=db_row['nom_publique'] or '',
                        description=db_row['resource_description'] or '',
                        description_fr=db_row['description_francais'] or '',
                        item_id=db_row['resource_agency_number'],
                        lat=float(geocoordinates[0]),
                        lng=float(geocoordinates[1]),
                        address=db_row['physical_address'],
                        link=db_row['link'],
                        phone=db_row['phone'],
                        clusterId=db_row['cluster_id'])
