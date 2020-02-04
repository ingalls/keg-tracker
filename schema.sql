CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
) WITH (OIDS=FALSE);

CREATE TABLE company (
    id          UUID PRIMARY KEY,
    addr        TEXT,
    city        TEXT,
    state       TEXT,
    postcode    TEXT,
    agents      JSONB
)
