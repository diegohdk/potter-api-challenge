'use strict';

require('dotenv').config();

exports.mochaHooks = {
    async beforeAll() {
        const done = require('./db');
        await done();
    },
    async afterAll() {
        const mongoose = require('mongoose');
        const mongoUnit = require('mongo-unit');
        await mongoose.disconnect();
        await mongoUnit.stop();
    }
};