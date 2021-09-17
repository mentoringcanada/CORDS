get_cutoff_constrained_results_1 = """SELECT 2*asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))*6372.8 as distance, *
FROM resources
WHERE resource_agency_number in (
"""
get_cutoff_constrained_results_2 = """)
AND 2*asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))*6372.8 < {2}
ORDER BY asin(sqrt(pow(sin(radians({0}-geocoordinates[0])/2),2)
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
+cos(radians({0}))*cos(radians(geocoordinates[0]))*pow(sin(radians({1}-geocoordinates[1])/2), 2)))*6372.8 < {2}
ORDER BY array_position(ARRAY[{3}]::varchar[], resource_agency_number)
LIMIT 50;
"""

get_proximity_results = """SELECT *
FROM resources
WHERE resource_agency_number in ({0})
ORDER BY 2*asin(sqrt(pow(sin(radians({1}-geocoordinates[0])/2),2)
+cos(radians({1}))*cos(radians(geocoordinates[0]))*pow(sin(radians({2}-geocoordinates[1])/2), 2)))*6372.8 DESC
LIMIT {3};
"""

get_results = """SELECT *
FROM resources
WHERE resource_agency_number in ({0})
ORDER BY array_position(ARRAY[{0}]::varchar[], resource_agency_number)
LIMIT 50;
"""

get_all_vectors = """SELECT resource_agency_number, description_vector
FROM resources
WHERE description_vector IS NOT NULL;"""

get_item_by_id = """SELECT resource_description, description_francais, nom_publique, public_name, description_vector
FROM resources WHERE resource_agency_number = %s"""

get_popular_taxonomies = "SELECT distinct taxonomy_code, taxonomy_name, count(*) FROM rec_data GROUP BY taxonomy_code, taxonomy_name ORDER BY 3 DESC;"

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
FROM (SELECT taxonomy_code, count(*) FROM service_taxonomies GROUP BY taxonomy_code) tax_counts
INNER JOIN (SELECT cluster_id, taxonomy_code, count(*)
FROM resources r
INNER JOIN service_taxonomies st
    ON r.resource_agency_number = st.resource_agency_number
GROUP BY cluster_id, taxonomy_code) pair_counts
ON tax_counts.taxonomy_code = pair_counts.taxonomy_code
ORDER BY 3 ASC;"""

get_clusters_data = """SELECT *,
(two_dim[0] - (select min(two_dim[0]) from clusters)) / (select max(two_dim[0]) - min(two_dim[0]) from clusters) as scaled_x,
(two_dim[1] - (select min(two_dim[1]) from clusters)) / (select max(two_dim[1]) - min(two_dim[1]) from clusters) as scaled_y
FROM clusters c"""

get_all_vectors_and_IDs = """SELECT resource_agency_number, description_vector
    FROM resources
    WHERE description_vector IS NOT NULL;"""

get_distinct_taxonomies = """SELECT distinct taxonomy_code FROM rec_data;"""

assign_cluster_id_to_taxonomy = """UPDATE
        rec_data as rd
    SET
        cluster_ID = e.cluster_id
        FROM (VALUES %s) AS e(cluster_id, tax_code) 
    WHERE
        taxonomy_code = e.tax_code;
    """

create_recommendations_table = """CREATE TABLE IF NOT EXISTS rec_data (
        call_report_number varchar,
        taxonomy_code varchar,
        taxonomy_name varchar
    );"""

load_recommendation_data = """INSERT INTO rec_data
        (call_report_number, taxonomy_code, taxonomy_name) VALUES (
            %s, %s, %s
        );
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

get_cluster_recommendations_from_clusters = """SELECT
        cluster_id
    FROM
        (
            SELECT
                cluster_id,
                SUM(LOG(call_points_table.call_points)) as cluster_points
            FROM
                rec_data rc
                INNER JOIN (
                    SELECT
                        call_report_number,
                        COUNT(*) as call_points
                    FROM
                        rec_data
                    WHERE
                        cluster_id in (
                            SELECT distinct cluster_id 
                            FROM rec_data
                            WHERE taxonomy_code = any(%s)
                        )
                    GROUP BY
                        call_report_number
                ) call_points_table ON rc.call_report_number = call_points_table.call_report_number
            GROUP BY cluster_id
            ORDER BY
                2 DESC
            LIMIT
                %s
        ) clusters"""

get_random_multiple_referral_call = """SELECT
        one_id.call_report_number,
        taxonomy_code
    FROM
        (
            SELECT
                multiples.call_report_number,
                random()
            FROM
                 (
                    SELECT
                        call_report_number,
                        count(taxonomy_code) as counts
                    FROM
                        rec_data
                    GROUP BY
                        call_report_number
                ) multiples
            WHERE
                counts > 1
            ORDER BY 2 LIMIT 1
        ) one_id
        INNER JOIN rec_data rc ON rc.call_report_number = one_id.call_report_number;
    """

is_item_in_cluster = """SELECT cluster_id FROM resources WHERE resource_agency_number in
    (SELECT resource_agency_number FROM service_taxonomies WHERE taxonomy_code = %s);"""

save_feedback = """INSERT INTO feedback (
    query, item_id, sort_order, msg, type_of_feedback
) VALUES (%s, %s, %s, %s, %s);"""

save_item = """INSERT INTO baskets (item_id, session) VALUES (%s, %s);"""

remove_item = """DELETE FROM baskets WHERE item_id = %s AND session = %s;"""

get_items_by_session = """SELECT * FROM resources WHERE resource_agency_number
IN (SELECT item_id FROM baskets WHERE session = %s);"""
