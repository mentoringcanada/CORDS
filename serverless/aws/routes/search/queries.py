get_all_vectors = """SELECT resource_agency_number, description_vector
FROM resources
WHERE description_vector IS NOT NULL limit 1500;"""


get_proximity_results = """SELECT *
FROM resources
WHERE resource_agency_number in ({0})
"""
get_proximity_results_2 = """ORDER BY 2*asin(sqrt(pow(sin(radians({1}-geocoordinates[0])/2),2)
+cos(radians({1}))*cos(radians(geocoordinates[0]))*pow(sin(radians({2}-geocoordinates[1])/2), 2)))*6372.8 DESC
LIMIT {3};
"""


get_results = """SELECT *
FROM resources
WHERE resource_agency_number in ({0}) """

get_results_2 = """ ORDER BY array_position(ARRAY[{0}]::varchar[], resource_agency_number)
LIMIT 50;
"""


get_constrained_results_1 = """SELECT 2*asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))*6372.8 as distance, *
FROM resources
WHERE resource_agency_number in (
"""
get_constrained_results_2 = """)
AND 2*asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))*6372.8 < {2}"""

get_constrained_results_3 = """ORDER BY array_position(ARRAY[{0}]::varchar[], resource_agency_number)
LIMIT 50;
"""
