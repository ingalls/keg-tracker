class Company {
    constructor(pg, argv, srv) {
        this.pg = pg;
        this.argv =  argv;
        this.srv = srv;
    }

    list(filter, cb) {
        this.pg.query(`
            SELECT row_to_json(t) AS row
            FROM (
                SELECT
                    company.id,
                    company.name,
                    COUNT(keg.location) AS kegs
                FROM
                    company,
                    keg
                WHERE
                    keg.location = company.id
                GROUP BY
                    company.id,
                    company.name
            ) t;
       `, (err, res) => {
            return cb(err, res.rows)
       });
    }

    create(company, cb) {

    }

    get(id, cb) {

    }

    update(id, company, cb) {

    }

    delete(id, cb) {

    }
}

module.exports = Company;
