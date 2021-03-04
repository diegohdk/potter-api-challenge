'use strict';

const axios = require('axios');
const CircuitBreakerManager = require('./CircuitBreakerManager');
const House = require('../models/House');
const log = require('../services/log');

/**
 * This class interacts with the remote API.
 */
class APIClient
{
    /**
     * Base URI of the remote API.
     */
    static get BASE_URI()
    {
        return 'http://us-central1-rh-challenges.cloudfunctions.net/potterApi';
    }

    /**
     * Class constructor.
     */
    constructor()
    {
        this.request = axios.create({
            baseURL : APIClient.BASE_URI,
            headers : {
                apikey : process.env.API_KEY
            }
        });
    }

    /**
     * Creates a new class instance.
     */
    static create()
    {
        return new APIClient;
    }

    /**
     * Checks whether there's a house with the provided ID.
     *
     * The verification is done with a circuit breaker. If available, the remote
     * API is queried to check the existence of the house. But if the API is
     * unavailable, the house is search in the local DB.
     *
     * @param {String} house House id.
     *
     * @returns {Promise<Boolean>} Resolves to a boolean.
     */
    async validateHouse(house)
    {
        let circuit = CircuitBreakerManager.get('houseValidation');

        if (!circuit) {
            circuit = CircuitBreakerManager.register(
                'houseValidation',
                async house => await this.findHouseOnRemote(house),
                async house => {
                    log('Remote API failed. Falling back...');
                    return await this.findHouseOnLocal(house);
                }
            );
        }

        return await circuit.fire(house);
    }

    /**
     * Checks whether there's a house with the provided ID on the remote API.
     *
     * @param {String} house House ID.
     *
     * @returns {Promise<Boolean>} Resolves to a boolean.
     */
    async findHouseOnRemote(house)
    {
        const response = await this.request.get('/houses');
        return response.data.houses.some(h => h.id === house);
    }

    /**
     * Checks whether there's a house with the provided ID on the local DB.
     *
     * @param {String} house House ID.
     *
     * @returns {Promise<Boolean>} Resolves to a boolean.
     */
    findHouseOnLocal(house)
    {
        return (new House).model.exists({uid : house});
    }
}

module.exports = APIClient;