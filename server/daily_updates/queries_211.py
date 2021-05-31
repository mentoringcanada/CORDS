update_resource_description_en = """INSERT INTO resources (
    resource_agency_number,
    public_name,
    physical_address,
    geocoordinates,
    resource_description,
    link,
    phone,
    description_updated
) VALUES ('{0}', '{1}', '{2}', point({3}, {4}), '{5}', '{6}', '{7}', NOW())
ON CONFLICT (resource_agency_number)
DO UPDATE
SET resource_description = '{5}',
description_updated = NOW(),
public_name = '{1}';
"""

update_resource_description_fr = """INSERT INTO resources (
    resource_agency_number,
    nom_publique,
    physical_address,
    geocoordinates,
    description_francais,
    link,
    phone,
    description_updated
) VALUES ( '{0}', '{1}', '{2}', point({3}, {4}), '{5}', '{6}', '{7}', NOW())
ON CONFLICT (resource_agency_number)
DO UPDATE
SET description_francais = '{5}',
description_updated = NOW(),
nom_publique = '{1}';
"""
