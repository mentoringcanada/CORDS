import requests
import sys
import os

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)

import model

lst = []
for x in range(7):
    input_json = requests.get("https://connect-server.mentor-canada.dev/api/program?page[limit]=10&page[offset]=" + str(x*10)).json()
    for data in input_json["data"]:
        if (data['attributes']['locations']):
            for location in data['attributes']['locations']:
                lst.append([data['attributes']['name'].get('en', ''),       # public_name
                            data['attributes']['name'].get('fr', ''),       
                            data['attributes']['description'].get('en', ''),
                            data['attributes']['description'].get('fr', ''),
                            location['name'],
                            float(location['lat']),
                            float(location['lng']),
                            data['attributes']['phone'],
                            data['attributes']['website'].get('en', ''),
                            data['attributes']['website'].get('fr', '')
                ])


insert_job_resources = """INSERT INTO
    resources (
        resource_agency_number,
        public_name,
        nom_publique,
        resource_description,
        description_francais,
        physical_address,
        geocoordinates,
        phone,
        website,
        website_francais,
        description_updated,
        resource_type
    ) (
        SELECT
            e.public_name,
            e.public_name,
            e.nom_publique,
            e.resource_description,
            e.description_francais,
            e.physical_address,
            point(e.geo_x, e.geo_y),
            e.phone,
            e.website,
            e.website_francais,
            NOW(),
            'mentoring'
        FROM
            (VALUES %s) as e(
                public_name,
                nom_publique,
                resource_description,
                description_francais,
                physical_address,
                geo_x,
                geo_y,
                phone,
                website,
                website_francais
            )
    ) ON CONFLICT DO NOTHING RETURNING resource_agency_number;
"""


model.execute_many(insert_job_resources, lst)
