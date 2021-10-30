import model
import csv


data_dicts = []
with open('PostingsData.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data_dicts.append([
            row['posting_id'],
            row['posting_title'] + ' - ' + row['posting_org'],
            float(row['posting_latitude']),
            float(row['posting_longitude']),
            row['posting_description']
        ])


insert_job_resources_en = """INSERT INTO
    resources (
        resource_agency_number,
        public_name,
        geocoordinates,
        resource_description,
        description_updated,
        resource_type
    ) (
        SELECT
            e.resource_agency_number,
            e.public_name,
            point(e.geo_x, e.geo_y),
            e.resource_description,
            NOW(),
            'employment'
        FROM
            (VALUES %s) as e(
                resource_agency_number,
                public_name,
                geo_x,
                geo_y,
                resource_description
            )
    ) ON CONFLICT DO NOTHING RETURNING resource_agency_number;
"""


model.execute_many(insert_job_resources_en, data_dicts)