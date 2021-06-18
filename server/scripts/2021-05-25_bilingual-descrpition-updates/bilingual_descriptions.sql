ALTER TABLE resources ADD COLUMN description_francais VARCHAR;
ALTER TABLE resources ADD COLUMN description_updated TIMESTAMP DEFAULT NOW();
ALTER TABLE resources ADD COLUMN vectors_updated TIMESTAMP DEFAULT NOW();
ALTER TABLE resources ADD COLUMN nom_publique VARCHAR;