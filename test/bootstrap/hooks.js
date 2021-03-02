'use strict';

require('dotenv').config();

exports.mochaHooks = {
    async beforeAll() {
        const done = require('./db');
        await done();
    },
    async afterAll() {
        const mongoose = require('mongoose');
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    }
};