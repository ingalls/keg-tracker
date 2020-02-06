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
DROP TABLE IF EXISTS location;

CREATE TABLE location (
    id          UUID PRIMARY KEY,
    name        TEXT UNIQUE NOT NULL,
    addr        TEXT,
    city        TEXT,
    region      TEXT,
    postcode    TEXT,
    agents      JSONB
);

INSERT INTO location (
    id,
    name
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'Winchester Ciderworks Downstairs'
);

CREATE TABLE product (
    id          UUID PRIMARY KEY,
    status      TEXT NOT NULL,
    name        TEXT UNIQUE NOT NULL
);

INSERT INTO product (
    id,
    status,
    name
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'none',
    'Empty'
);

CREATE TABLE keg (
    id          UUID PRIMARY KEY,

    -- Current Status - Changes Audited --
    name            TEXT UNIQUE NOT NULL,
    location        UUID REFERENCES location(id),
    movement        TIMESTAMP NOT NULL, -- Reset everytime the keg moves
    status          TEXT NOT NULL,
    product         UUID REFERENCES product(id),

    -- Current Status - Changes Not Audited --
    created         TIMESTAMP NOT NULL,
    manufacturer    TEXT,
    capacity        TEXT NOT NULL
);

CREATE TABLE keg_audit (
    id          UUID PRIMARY KEY,
    keg         UUID REFERENCES keg(id),
    name        TEXT NULL,
    location    UUID REFERENCES location(id),
    movement    TIMESTAMP NOT NULL,
    status      TEXT NOT NULL,
    product     UUID REFERENCES product(id)
);
