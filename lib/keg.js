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
        `, (err, res) => {
            if (err) return cb(new PublicError(500, err, 'Could not list kegs'));

            return cb(null, res.rows);
        })
    }

    create(keg, cb) {
        if (!keg.name) return cb(new PublicError(400, null, 'Keg name required'));
        if (!keg.status) return cb(new PublicError(400, null, 'Keg name required'));

        this.pg.query(SQL`
            INSERT INTO keg (
                id,
                name,
                location,
                status,
                product,
                created,
                movement,
                capacity
            ) VALUES (
                ${uuid()},
                ${keg.name},
                '00000000-0000-0000-0000-000000000000'::UUID,
                ${keg.status},
                '00000000-0000-0000-0000-000000000000'::UUID,
                NOW(),
                NOW(),
                COALESCE(${keg.capacity})
            ) RETURNING *
        `, (err, res) => {
            if (err && err.code === '23505') {
                return cb(new PublicError(400, null, 'Keg with that name already exists'));
            } else if (err) {
                return cb(new PublicError(500, err, 'Could not create keg'));
            }

            const keg = res.rows[0];

            this.audit(keg, cb);
        });
    }

    audit(keg, cb) {
        if (!keg.id) return cb(new PublicError(400, null, 'Keg id required'));

        this.pg.query(SQL`
            INSERT INTO keg_audit (
                id,
                name,
                location,
                movement,
                status,
                product
            ) SELECT
                ${uuid()} AS id,
                name,
                location,
                movement,
                status,
                product
            FROM
                keg
            WHERE
                keg.id = ${keg.id}
        `, (err) => {
            if (err) return cb(new PublicError(500, err, 'Could not add keg to audit log'));

            return cb(null, keg);
        });
    }

    get(id, cb) {
        this.pg.query(SQL`
            SELECT
                id,
                name,
                location,
                movement,
                status,
                product,
                created,
                manufactuerer,
                capacity
            FROM 
                keg
            WHERE
                keg.id = ${id}
        `, (err, res) => {
            if (err) return cb(new PublicError(500, err, 'Could not get keg'));

            return cb(null, res.rows[0]);
        });
    }
}

module.exports = Keg;
