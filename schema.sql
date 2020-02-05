CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS session;
CREATE TABLE session (
    sid         VARCHAR NOT NULL UNIQUE COLLATE "default",
    sess        JSON NOT NULL,
    expire      TIMESTAMP(6) NOT NULL
) WITH (OIDS=FALSE);

DROP TABLE IF EXISTS keg_audit;
DROP TABLE IF EXISTS keg;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS company;

CREATE TABLE company (
    id          UUID PRIMARY KEY,
    name        TEXT UNIQUE NOT NULL,
    addr        TEXT,
    city        TEXT,
    state       TEXT,
    postcode    TEXT,
    agents      JSONB
);

CREATE TABLE product (
    id          UUID PRIMARY KEY,
    status      TEXT NOT NULL,
    name        TEXT UNIQUE NOT NULL
);

CREATE TABLE keg (
    id          UUID PRIMARY KEY,

    -- Current Status - Changes Audited --
    name        TEXT UNIQUE NOT NULL,
    location    UUID ,--REFERENCES company(id),
    status      TEXT NOT NULL,
    product     UUID ,--REFERENCES product(id),

    -- Current Status - Changes Not Audited --
    created     TIMESTAMP,
    capacity    BIGINT
);

CREATE TABLE keg_audit (
    id          UUID PRIMARY KEY,
    keg         UUID REFERENCES keg(id),
    name        TEXT UNIQUE NOT NULL,
    location    UUID REFERENCES company(id),
    status      TEXT NOT NULL,
    product     UUID REFERENCES product(id)
);
