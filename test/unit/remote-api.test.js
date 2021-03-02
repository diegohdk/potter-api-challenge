'use strict';

const assert = require('assert');
const APIClient = require('../../lib/APIClient');

describe('Remote API tests', () => {
    const validHouseId = '1760529f-6d51-4cb1-bcb1-25087fce5bde';
    const invalidHouseId = '321321-546487-8954954';

    it('should find a house on remote API', async function() {
        const found = await APIClient.create().findHouseOnRemote(validHouseId);
        assert.strictEqual(found, true);
    });

    it('should not find a house on remote API', async function() {
        const found = await APIClient.create().findHouseOnRemote(invalidHouseId);
        assert.strictEqual(found, false);
    });

    it('should find a house on local DB', async function() {
        const found = await APIClient.create().findHouseOnLocal(validHouseId);
        assert.strictEqual(found, true);
    });

    it('should not find a house on local DB', async function() {
        const found = await APIClient.create().findHouseOnLocal(invalidHouseId);
        assert.strictEqual(found, false);
    });

    it('should find a house with circuit breaker', async function() {
        const found = await APIClient.create().validateHouse(validHouseId);
        assert.strictEqual(found, true);
    });

    it('should not find a house with circuit breaker', async function() {
        const found = await APIClient.create().validateHouse(invalidHouseId);
        assert.strictEqual(found, false);
    });
});