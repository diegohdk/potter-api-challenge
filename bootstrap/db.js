'use strict';

const mongoose = require('mongoose');
const log = require('../services/log');
const die = require('../services/errors');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        log('Connected to DB', process.env.DB_URI);
        mongoose.connection.on('disconnected', () => log('Disconnected to DB'));
    })
    .catch(error => die('MongoDBConnectionError', true, error));

module.exports = mongoose;