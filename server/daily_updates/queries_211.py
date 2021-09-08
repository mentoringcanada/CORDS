update_resource_descriptions_en = """UPDATE
    resources r
SET
    public_name = e.public_name,
    physical_address = e.physical_address,
    geocoordinates = POINT(e.geo_x, e.geo_y),
    resource_description = e.resource_description,
    link = e.link,
    phone = e.phone,
    description_updated = NOW()
FROM
    (VALUES %s) as e(
        resource_agency_number,
        public_name,
        physical_address,
        geo_x,
        geo_y,
        resource_description,
        link,
        phone
    )
WHERE
    r.resource_agency_number = e.resource_agency_number;
"""

insert_resource_descriptions_en = """INSERT INTO
    resources (
        resource_agency_number,
        public_name,
        physical_address,
        geocoordinates,
        resource_description,
        link,
        phone,
        description_updated,
        website,
        email,
        service_hours,
        languages,
        eligibility
    ) (
        SELECT
            e.resource_agency_number,
            e.public_name,
            e.physical_address,
            point(e.geo_x, e.geo_y),
            e.resource_description,
            e.link,
            e.phone,
            NOW(),
            website,
            email,
            service_hours,
            languages,
            eligibility
        FROM
            (VALUES %s) as e(
                resource_agency_number,
                public_name,
                physical_address,
                geo_x,
                geo_y,
                resource_description,
                link,
                phone,
                website,
                email,
                service_hours,
                languages,
                eligibility
            )
    ) ON CONFLICT DO NOTHING RETURNING resource_agency_number;
"""

update_resource_descriptions_fr = """UPDATE
    resources r
SET
    nom_publique = e.nom_publique,
    physical_address = e.physical_address,
    geocoordinates = POINT(e.geo_x, e.geo_y),
    description_francais = e.description_francais,
    link = e.link,
    phone = e.phone,
    description_updated = NOW(),
    website = e.website,
    email = e.email,
    service_hours = e.service_hours,
    languages = e.languages,
    eligibility = e.eligibility
FROM
    (VALUES %s) as e(
        resource_agency_number,
        nom_publique,
        physical_address,
        geo_x,
        geo_y,
        description_francais,
        link,
        phone,
        website,
        email,
        service_hours,
        languages,
        eligibility
    )
WHERE 
    r.resource_agency_number = e.resource_agency_number;
"""

insert_resource_descriptions_fr = """INSERT INTO
    resources (
        resource_agency_number,
        nom_publique,
        physical_address,
        geocoordinates,
        description_francais,
        link,
        phone,
        description_updated
    ) (
        SELECT
            e.resource_agency_number,
            e.nom_publique,
            e.physical_address,
            point(e.geo_x, e.geo_y),
            e.description_francais,
            e.link,
            e.phone,
            NOW()
        FROM
            (VALUES %s) as e(
                resource_agency_number,
                nom_publique,
                physical_address,
                geo_x,
                geo_y,
                description_francais,
                link,
                phone
            )
    ) ON CONFLICT DO NOTHING RETURNING resource_agency_number;
"""
