CREATE DATABASE yourdbname;
CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
GRANT ALL PRIVILEGES ON DATABASE yourdbname TO youruser;

\c yourdbname;
CREATE EXTENSION cube;
CREATE EXTENSION earthdistance;