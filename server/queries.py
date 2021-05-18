get_constrained_results_1 = """SELECT *, (geocoordinates <@> POINT({0}, {1}))*1.6 as distance
FROM resources
WHERE resource_agency_number in (
"""
get_constrained_results_2 = """)
AND geocoordinates <@> POINT({0}, {1}) < {2}
ORDER BY array_position(ARRAY[{3}]::varchar[], resource_agency_number)
LIMIT 10;
"""

get_results = """SELECT *
FROM resources
WHERE resource_agency_number in ({0})
ORDER BY array_position(ARRAY[{0}]::varchar[], resource_agency_number)
LIMIT 10;
"""

get_all_vectors = """SELECT resource_agency_number, description_vector
FROM resources
WHERE description_vector IS NOT NULL;"""

get_item_by_id = """SELECT resource_description
FROM resources WHERE resource_agency_number = %s"""
