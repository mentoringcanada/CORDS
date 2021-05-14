ALTER TABLE resources ADD COLUMN link VARCHAR;

UPDATE resources SET link = CONCAT('https://211central.ca/record/', resource_agency_number);
