'use strict';

const CircuitBreaker = require('opossum');
const log = require('../services/log');

const CIRCUITS = new Map;
const options = {
    errorThresholdPercentage : Number(process.env.CIRCUIT_BREAKER_THRESHOLD),
    timeout : Number(process.env.CIRCUIT_BREAKER_TIMEOUT),
    resetTimeout : Number(process.env.CIRCUIT_BREAKER_RESET_TIMEOUT)
};

/**
 * Circuit breaker manager.
 */
class CircuitBreakerManager
{
    /**
     * Get a registered circuit breaker.
     *
     * @param {String} name Instance name.
     *
     * @returns {CircuitBreaker} The circuit breaker instance.
     */
    static get(name)
    {
        return CIRCUITS.get(name);
    }

    /**
     * Registers a new circuit breaker to execute the provided function.
     *
     * @param {String} name Instance name.
     * @param {CallableFunction} fn The function to execute.
     * @param {CallableFunction} fallback The fallback function to execute in
     * case of errors.
     *
     * @returns {CircuitBreaker} The circuit breaker instance.
     */
    static register(name, fn, fallback)
    {
        const circuit = new CircuitBreaker(fn, options);

        circuit.fallback(fallback);
        circuit.on('open', () => log(`Circuit ${name} opened`));
        circuit.on('halfOpen', () => log(`Circuit ${name} half-opened`));
        circuit.on('close', () => log(`Circuit ${name} closed`));
        CIRCUITS.set(name, circuit);

        return circuit;
    }

    /**
     * Removes a registered circuit breaker.
     *
     * @param {String} name Instance name.
     */
    static remove(name)
    {
        if (CIRCUITS.has(name)) {
            CIRCUITS.get(name).shutdown();
            CIRCUITS.delete(name);
        }
    }
}

module.exports = CircuitBreakerManager;