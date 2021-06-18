CREATE TABLE IF NOT EXISTS clusters (
        cluster_id INT,
        centre DOUBLE PRECISION[],
        two_dim POINT,
        num_services INT,
        summary varchar
    );

CREATE TABLE IF NOT EXISTS service_taxonomies (
        resource_agency_number varchar,
        taxonomy_code varchar,
        taxonomy_name varchar
    ); 

CREATE TABLE IF NOT EXISTS rec_data (
        call_report_number varchar,
        taxonomy_code varchar,
        taxonomy_name varchar,
        cluster_id int
    );