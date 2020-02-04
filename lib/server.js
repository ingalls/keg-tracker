'use strict';

const config = require('../config.json');
const session = require('express-session');
const bodyparser = require('body-parser');
const minify = require('express-minify');
const express = require('express');
const moment = require('moment');
const PG = require('pg').Client;

const pgSession = require('connect-pg-simple')(session);
const router = express.Router();
const app = express();

app.disable('x-powered-by');
app.use('/', router);
app.use(minify());
app.use(express.static('web'));

app.use((req, res) => {
    return res.redirect('/404');
});

let pg_client, arg;

const srv = {};

/**
 * Start the Keg Tracking Server
 *
 * @param {Object} argv command line arguments
 * @param {Function} cb callback
 */
function start(argv, cb) {
    if (!argv) throw new Error('args required');
    if (!argv.db) throw new Error('--db=<Postgres Database> required');

    arg = argv;

    if (argv.prod) {
        pg_client = new PG(config.database);
    } else {
        pg_client = new PG({
            user: 'postgres',
            host: 'localhost',
            database: argv.db,
            port: 5432
        });
    }

    pg_client.connect();

    srv.company = new (require('./company'))(pg_client, argv, srv);
    srv.keg = new (require('./keg'))(pg_client, argv, srv);

    router.use(session({
        name: argv.prod ? '__Host-session' : 'session',
        proxy: argv.prod,
        resave: false,
        store: new pgSession({
            pool: pg_client,
            tableName : 'session'
        }),
        cookie: {
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite: true,
            secure: argv.prod
        },
        saveUninitialized: true,
        secret: config.server['session-secret']
    }));

    router.use(bodyparser.urlencoded({ extended: true }));
    router.use(bodyparser.json());

    router.use((req, res, next) => {
        // Log incoming requests
        if (arg.log && !req.url.match(/.*\.(gif|png|jpg|css|js)/)) {
            if (req.session && req.session.auth) {
                console.log('[%s] %s %s (%s)', moment().format(), req.method, req.url, req.session.auth.username);
            } else {
                console.log('[%s] %s %s (not authenticated)', moment().format(), req.method, req.url);
            }
        }
    });

    router.get('/api/company', (req, res) => {
        srv.company.list(req.query, (err, companies) => {
        });
    });

    router.post('/api/company', (req, res) => {
        srv.company.create(req.query, (err, company) => {
        });
    });

    router.get('/api/company/:company', (req, res) => {
        srv.company.get(req.query, (err, company) => {
        });
    });

    router.patch('/api/company/:company', (req, res) => {
        srv.company.update(req.query, (err, company) => {
        });
    });

    router.delete('/api/company/:company', (req, res) => {
        srv.company.delete(req.query, (err, company) => {
        });
    });

    app.listen(config.server.port, (err) => {
        console.log(`Server listening on port ${config.server.port}`);

        if (cb) return cb(null);
    });
}

module.exports = {
    start
}
