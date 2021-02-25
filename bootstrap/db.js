'use strict';

const mongoose = require('mongoose');
const log = require('../services/log');
const die = require('../services/errors');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => log('Connected to DB'))
    .catch(error => die('MongoDBConnectionError', true, error));