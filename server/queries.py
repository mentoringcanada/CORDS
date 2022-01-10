get_cutoff_constrained_results_1 = """SELECT 2*asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))*6372.8 as distance, *
FROM resources
WHERE resource_agency_number in (
"""
get_cutoff_constrained_results_2 = """)
AND 2*asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))*6372.8 < {2} """

get_cutoff_constrained_results_3 = """ ORDER BY asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))
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

get_all_vectors = """SELECT resource_agency_number, description_vector
FROM resources
WHERE description_vector IS NOT NULL limit 1500;"""

get_item_by_id = """SELECT resource_description, description_francais, nom_publique, public_name, description_vector
FROM resources WHERE resource_agency_number = %s"""


get_cluster_data = """SELECT *,
(two_dim[0] - (select min(two_dim[0]) from clusters)) / (select max(two_dim[0]) - min(two_dim[0]) from clusters) as scaled_x,
(two_dim[1] - (select min(two_dim[1]) from clusters)) / (select max(two_dim[1]) - min(two_dim[1]) from clusters) as scaled_y
FROM clusters 
WHERE cluster_id = %s"""

get_all_items_from_cluster = "SELECT * FROM resources WHERE cluster_id = %s;"

get_taxonomies_clusters = """SELECT 
MODE() WITHIN GROUP (ORDER BY cluster_id) AS cluster_id,
st.taxonomy_code
FROM resources r
INNER JOIN service_taxonomies st
    ON r.resource_agency_number = st.resource_agency_number
GROUP BY st.taxonomy_code;"""

get_cluster_taxonomies = """SELECT 
r.cluster_id,
MODE() WITHIN GROUP (ORDER BY st.taxonomy_code) AS taxonomy_code
FROM resources r
INNER JOIN service_taxonomies st
    ON r.resource_agency_number = st.resource_agency_number
WHERE r.cluster_id <> any(%s)
GROUP BY r.cluster_id;"""

get_likelihood_of_vector_to_cluster = """SELECT cluster_id, tax_counts.taxonomy_code, pair_counts.count/tax_counts.count ratio
FROM (SELECT taxonomy_code, count(*) FROM service_taxonomies WHERE r.resource_type = 'employment' GROUP BY taxonomy_code) tax_counts
INNER JOIN (SELECT cluster_id, taxonomy_code, count(*)
FROM resources r
INNER JOIN service_taxonomies st
    ON r.resource_agency_number = st.resource_agency_number
WHERE r.resource_type = 'employment'
GROUP BY cluster_id, taxonomy_code) pair_counts
ON tax_counts.taxonomy_code = pair_counts.taxonomy_code
ORDER BY 3 ASC;"""

get_cluster_per_service = """SELECT cluster_id, resource_agency_number
FROM resources;"""

get_clusters_data = """SELECT *,
(two_dim[0] - (select min(two_dim[0]) from clusters)) / (select max(two_dim[0]) - min(two_dim[0]) from clusters) as scaled_x,
(two_dim[1] - (select min(two_dim[1]) from clusters)) / (select max(two_dim[1]) - min(two_dim[1]) from clusters) as scaled_y
FROM clusters c"""

get_all_vectors_and_IDs_of_resource_type = """SELECT resource_agency_number, description_vector
    FROM resources
    WHERE description_vector IS NOT NULL
    AND resource_type = '{0}';"""

get_all_vectors_and_IDs = """SELECT resource_agency_number, description_vector
    FROM resources
    WHERE description_vector IS NOT NULL;"""


assign_cluster_id_to_referrals = """UPDATE
        referrals as rd
    SET
        cluster_ID = e.cluster_id
        FROM (VALUES %s) AS e(cluster_id, services) 
    WHERE
        service_id = e.services;
    """

create_service_taxonomies_table = """CREATE TABLE IF NOT EXISTS service_taxonomies (
        resource_agency_number varchar,
        taxonomy_code varchar
    );"""


insert_service_taxonomy = """INSERT INTO service_taxonomies
        (resource_agency_number, taxonomy_code) VALUES (
            %s, %s
        );
        """

assign_clusters_to_vectors = """UPDATE resources as r 
SET cluster_id = e.cluster_id
FROM (VALUES %s) as e(cluster_id, resource_agency_number)
WHERE e.resource_agency_number = r.resource_agency_number;"""

get_applicable_clusters_to_taxonomy = """ ;
    """


is_item_in_cluster = """SELECT cluster_id FROM resources WHERE resource_agency_number in
    (SELECT resource_agency_number FROM service_taxonomies WHERE taxonomy_code = %s);"""

save_feedback = """INSERT INTO feedback (
    query, item_id, sort_order, msg, type_of_feedback
) VALUES (%s, %s, %s, %s, %s);"""


get_items_by_session = """SELECT * FROM resources WHERE resource_agency_number
IN (SELECT item_id FROM baskets WHERE session = %s);"""

cluster_filtering_1 = """SELECT resources.* """

distance = """ 2*asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))*6372.8 """

cluster_filtering_2 = """ FROM resources
INNER JOIN
(SELECT SUM(start_referrals.points) as cluster_points, r3.cluster_id
FROM referrals r3
INNER JOIN
(SELECT COUNT(*) as points, r2.referral_id FROM referrals r2 WHERE r2.cluster_id IN
(SELECT distinct cluster_id FROM resources r1 WHERE r1.resource_agency_number = ANY(array{0}::varchar[])) GROUP BY r2.referral_id) start_referrals
ON r3.referral_id = start_referrals.referral_id GROUP BY r3.cluster_id ORDER BY SUM(start_referrals.points) DESC LIMIT 5) clusters
ON resources.cluster_id = clusters.cluster_id
WHERE """ 

cluster_filtering_3 = """ ORDER BY asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))
LIMIT 50;
"""

get_summaries_for_clusters = """SELECT summary FROM clusters WHERE cluster_id = ANY(array{0}::integer[]);
"""
