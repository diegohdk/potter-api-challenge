'use strict';

const assert = require('assert');
const models = [
    {name : 'House', length : 9},
    {name : 'Character', length : 5}
];

describe('Models tests', () => {
    models.forEach(modelConfig => {
        describe(modelConfig.name, function() {
            it(`should have ${modelConfig.length} keys`, function() {
                const Model = require(`../../models/${modelConfig.name}`);
                const model = new Model;
                assert.strictEqual(Object.keys(model.DEFINITION).length, modelConfig.length);
            });
        });
    });
});