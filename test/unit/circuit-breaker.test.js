'use strict';

const assert = require('assert');
const CircuitBreaker = require('opossum');
const CircuitBreakerManager = require('../../lib/CircuitBreakerManager');

async function sleep(time)
{
    return await new Promise(resolve => setTimeout(resolve, time));
}

function createCallback(time)
{
    return async () => {
        await sleep(Number(process.env.CIRCUIT_BREAKER_TIMEOUT) + (time || 0));
        return true;
    };
}

function fallback()
{
    return false;
}

describe('Circuit breaker tests', () => {
    it('should register', async function() {
        const circuit1 = CircuitBreakerManager.register('test0', createCallback(), fallback);
        const circuit2 = CircuitBreakerManager.get('test0');
        assert.ok(circuit1 instanceof CircuitBreaker);
        assert.strictEqual(circuit1, circuit2);
    });

    it('should remove', async function() {
        CircuitBreakerManager.register('test1', createCallback(), fallback);
        CircuitBreakerManager.remove('test1');
        assert.ifError(CircuitBreakerManager.get('test1'));
    });

    it('should resolve', async function() {
        const circuit = CircuitBreakerManager.register('test2', createCallback(-100), fallback);
        const result = await circuit.fire();
        assert.ok(result === true);
    });

    it('should reject', async function() {
        const circuit = CircuitBreakerManager.register('test3', createCallback(100), fallback);
        const result = await circuit.fire();
        assert.ok(result === false);
    });

    it('should fallback', function(done) {
        const circuit = CircuitBreakerManager.register('test4', createCallback(100), () => {
            assert.ok(true);
            done();
        });
        circuit.fire();
    });
});