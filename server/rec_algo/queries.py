get_popular_taxonomies = "SELECT distinct taxonomy_code, taxonomy_name, count(*) FROM rec_data GROUP BY taxonomy_code, taxonomy_name ORDER BY 3 DESC;"

get_cluster_data = "SELECT * FROM clusters WHERE cluster_id = %s"

get_all_items_from_cluster = "SELECT resource_agency_number, public_name, resource_description FROM resources WHERE cluster_id = %s;"

get_taxonomies_clusters = """SELECT 
MODE() WITHIN GROUP (ORDER BY cluster_id) AS cluster_id,
st.taxonomy_code
FROM resources r
INNER JOIN service_taxonomies st
    ON r.resource_agency_number = st.resource_agency_number
GROUP BY st.taxonomy_code;"""

get_clusters_data = """SELECT *,
(two_dim[0] - (select min(two_dim[0]) from clusters)) / (select max(two_dim[0]) - min(two_dim[0]) from clusters),
(two_dim[1] - (select min(two_dim[1]) from clusters)) / (select max(two_dim[1]) - min(two_dim[1]) from clusters)
FROM clusters c"""

get_number_of_offered_services_in_cluster = """SELECT
    count(*),
    taxonomy_name
FROM
    resources r
    INNER JOIN service_taxonomies st ON r.resource_agency_number = st.resource_agency_number
WHERE
    r.cluster_id = %s
GROUP BY
    taxonomy_name
ORDER BY 1 DESC;"""

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

get_applicable_clusters_to_taxonomy = """SELECT cluster_id 
    FROM (
        SELECT
            cluster_id,
            count(*)
        FROM
            service_taxonomies st
        INNER JOIN
            resources r
        ON
            st.resource_agency_number = r.resource_agency_number
        WHERE
            taxonomy_code = any(%s)
        GROUP BY
            cluster_id
        ORDER BY
            2 DESC
        LIMIT
            5
    ) clusters ;
    """

get_cluster_recommendations = """SELECT
        cluster_id
    FROM
        (
            SELECT
                cluster_id,
                SUM(call_points_table.call_points) as cluster_points
            FROM
                rec_data rc
                INNER JOIN (
                    SELECT
                        call_report_number,
                        COUNT(*) as call_points
                    FROM
                        rec_data
                    WHERE
                        cluster_id = any(%s::int[])
                    GROUP BY
                        call_report_number
                ) call_points_table ON rc.call_report_number = call_points_table.call_report_number
            GROUP BY cluster_id
            ORDER BY
                2 DESC
            LIMIT
                5
        ) clusters"""

get_restricted_cluster_recommendations = """SELECT
        cluster_id
    FROM
        (
            SELECT
                cluster_id,
                SUM(call_points_table.call_points) as cluster_points
            FROM
                rec_data rc
                INNER JOIN (
                    SELECT
                        call_report_number,
                        COUNT(*) as call_points
                    FROM
                        rec_data
                    WHERE
                        cluster_id = any(%s::int[])
                    GROUP BY
                        call_report_number
                ) call_points_table ON rc.call_report_number = call_points_table.call_report_number
            WHERE cluster_id <> ANY(%s)
            GROUP BY cluster_id
            ORDER BY
                2 DESC
            LIMIT
                5
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