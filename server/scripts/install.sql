CREATE DATABASE yourdbname;
CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
GRANT ALL PRIVILEGES ON DATABASE youdbname TO youruser;

\c yourdbname
CREATE EXTENSION earthdistance;