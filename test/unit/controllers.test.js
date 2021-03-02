'use strict';

const assert = require('assert');
const express = require('express');
const controllers = ['House', 'Character'];

describe('Controllers tests', () => {
    controllers.forEach(name => {
        describe(name, function() {
            it('should have a model', function() {
                const Controller = require(`../../controllers/${name}`);
                const router = express.Router();
                const controller = new Controller(router);
                assert.ok(controller.model);
            });
        });
    });
});