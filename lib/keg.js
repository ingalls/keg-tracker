const { SQL } = require('./util');
const uuid = require('uuid/v4');
const PublicError = require('./error');

class Keg {
    constructor(pg, argv, srv) {
        this.pg = pg;
        this.argv = argv;
        this.srv = srv;
    }

    list(filter, cb) {
        this.pg.query(SQL`
            SELECT row_to_json(t) AS row
            FROM (
                SELECT
                    keg.id,
                    keg.name,
                    keg.capacity,
                    location.name AS location
                FROM
                    keg INNER JOIN location
                    ON keg.location = location.id
                ORDER BY
                    keg.location DESC
            ) t;
        `, (err, res) => {
            if (err) return cb(new PublicError(500, err, 'Could not list kegs'));

            return cb(null, res.rows.map((row) => {
                return row.row;
            }));
        })
    }

    create(keg, cb) {
        if (!keg.name) return cb(new PublicError(400, null, 'Keg name required'));
        if (!keg.status) return cb(new PublicError(400, null, 'Keg name required'));

        console.error(keg);

        this.pg.query(SQL`
            INSERT INTO keg (
                id,
                name,
                location,
                status,
                product,
                created,
                capacity
            ) VALUES (
                ${uuid()},
                ${keg.name},
                '00000000-0000-0000-0000-000000000000'::UUID,
                ${keg.status},
                '00000000-0000-0000-0000-000000000000'::UUID,
                NOW(),
                COALESCE(${keg.capacity})
            ) RETURNING *
        `, (err, res) => {
            if (err && err.code === '23505') {
                return cb(new PublicError(400, null, 'Keg with that name already exists'));
            } else if (err) {
                return cb(new PublicError(500, err, 'Could not create keg'));
            }

            return cb(null, res.rows)
        })
    }
}

module.exports = Keg;
