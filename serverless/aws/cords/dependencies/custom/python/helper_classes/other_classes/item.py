from pydantic import BaseModel
from typing import Optional
from urllib import parse


class Item(BaseModel):
    name: Optional[str]
    resource_type: Optional[str]
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
            return Item(name=parse.unquote(db_row['public_name'] or ''),
                        resource_type=db_row['resource_type'],
                        nom=db_row['nom_publique'] or '',
                        description=parse.unquote(db_row['resource_description'] or ''),
                        description_fr=parse.unquote(db_row['description_francais'] or ''),
                        item_id=db_row['resource_agency_number'],
                        lat=float(geocoordinates[0]),
                        lng=float(geocoordinates[1]),
                        distance=int(db_row['distance']*100)/100,
                        address=parse.unquote(db_row['physical_address'] or ''),
                        link=db_row['link'] or '',
                        phone=parse.unquote(db_row['phone'] or ''),
                        clusterId=db_row['cluster_id'])
        else:
            return Item(name=parse.unquote(db_row['public_name'] or ''),
                        resource_type=db_row['resource_type'],
                        nom=db_row['nom_publique'] or '',
                        description=parse.unquote(db_row['resource_description'] or ''),
                        description_fr=parse.unquote(db_row['description_francais'] or ''),
                        item_id=db_row['resource_agency_number'],
                        lat=float(geocoordinates[0]),
                        lng=float(geocoordinates[1]),
                        address=parse.unquote(db_row['physical_address'] or ''),
                        link=db_row['link'] or '',
                        phone=parse.unquote(db_row['phone'] or ''),
                        clusterId=db_row['cluster_id'])
