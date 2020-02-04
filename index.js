#! /usr/bin/env node

'use strict';

const argv = require('minimist')(process.argv, {
    string: ['db'],
    boolean: ['prod']
});

const server = require('./lib/server');

server.start(argv);
