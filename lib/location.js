const { SQL } = require('./util');
const uuid = require('uuid/v4');
const PublicError = require('./error');

class Location {
    constructor(pg, argv, srv) {
        this.pg = pg;
        this.argv =  argv;
        this.srv = srv;
    }

    list(filter, cb) {
        this.pg.query(SQL`
            SELECT row_to_json(t) AS row
            FROM (
                SELECT
                    location.id,
                    location.name,
                    COUNT(keg) AS kegs
                FROM
                    location LEFT JOIN keg
                    ON location.id = keg.location
                GROUP BY
                    location.id,
                    location.name
            ) t;
       `, (err, res) => {
            if (err) return cb(new PublicError(500, err, 'Could not list locations'));

            return cb(null, res.rows.map((row) => {
                return row.row;
            }));
       });
    }

    create(location, cb) {
        if (!location.name) return cb(new PublicError(400, null, 'Location name required'));

        this.pg.query(SQL`
            INSERT INTO location (
                id,
                name
            ) VALUES (
                ${uuid()},
                ${location.name}
            ) RETURNING *
       `, (err, res) => {
            if (err && err.code === '23505') {
                return cb(new PublicError(400, null, 'Location with that name already exists'));
            } else if (err) {
                return cb(new PublicError(500, err, 'Could not create location'));
            }

            return cb(null, res.rows)
       });

    }

    get(id, cb) {
        this.pg.query(SQL`
            SELECT row_to_json(t) AS row
            FROM (
                SELECT
                    location.id,
                    location.name,
                    location.addr,
                    location.city,
                    location.region,
                    location.postcode,
                    location.agents
                FROM
                    location
            ) t;
       `, (err, res) => {
            if (err) return cb(new PublicError(500, err, 'Could not get location'));

            return cb(null, res.rows[0].row)
       });
    }

    update(id, location, cb) {

    }

    delete(id, cb) {

    }
}

module.exports = Location;
