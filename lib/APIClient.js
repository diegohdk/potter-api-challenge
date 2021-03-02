'use strict';

const axios = require('axios');
const circuitBreaker = require('opossum');

class APIClient
{
    constructor()
    {

    }

    validateHouse()
    {
        return new Promise((resolve, reject) => {
            const circuitBreakerOptions = {
                errorThresholdPercentage : 50,
                timeout : 1000,
                resetTimeout : 5000
            };
            const circuit = circuitBreaker(delayedFunction, circuitBreakerOptions);

            circuit.fallback(error => {
                if (error) {
                    console.log(error.message)
                    reject(error);
                } else {

                }
            });
        });
    }
}

module.exports = APIClient;