CREATE TABLE resources (
    resource_agency_number VARCHAR,
    data_parter_id BIGINT DEFAULT 1,
    public_name VARCHAR,
    physical_address VARCHAR,
    geocoordinates POINT,
    resource_description VARCHAR,
    description_vector REAL [],
    cluster_id INTEGER,
    PRIMARY KEY (resource_agency_number)
);
