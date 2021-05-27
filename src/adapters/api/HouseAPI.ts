import axios, { AxiosInstance } from 'axios';
import CircuitBreakerManager from '../../common/lib/CircuitBreakerManager';
import log from '../../common/utils/log';
import IHouseAPI from '../../core/features/characters/IHouseAPI';
import IHouseRepository from '../../core/repositories/IHouseRepository';

/**
 * This class interacts with the remote API.
 */
export default class HouseAPI implements IHouseAPI
{
    private request: AxiosInstance
    private repo: IHouseRepository

    /**
     * Base URI of the remote API.
     */
    static get BASE_URI()
    {
        return 'http://us-central1-rh-challenges.cloudfunctions.net/potterApi';
    }

    /**
     * Class constructor.
     *
     * @param {IHouseRepository} repo Repository instance.
     */
    constructor(repo?: IHouseRepository)
    {
        this.repo = repo;
        this.request = axios.create({
            baseURL : HouseAPI.BASE_URI,
            headers : {
                apikey : process.env.API_KEY
            }
        });
    }

    /**
     * Sets the repository instance.
     *
     * @param {IHouseRepository} repo Repository instance.
     */
    setRepository(repo: IHouseRepository): void
    {
        this.repo = repo;
    }

    /**
     * Checks whether there's a house with the provided ID.
     *
     * The verification is done with a circuit breaker. If available, the remote
     * API is queried to check the existence of the house. But if the API is
     * unavailable, the house is search in the local DB.
     *
     * @param {string} house House id.
     *
     * @returns {Promise<boolean>} Resolves to a boolean.
     */
    async validateHouse(house: string): Promise<boolean>
    {
        let circuit = CircuitBreakerManager.get('houseValidation');

        if (!circuit) {
            circuit = CircuitBreakerManager.register(
                'houseValidation',
                async (house: string) => await this.findHouseOnRemote(house),
                async (house: string) => {
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
     * @param {string} house House ID.
     *
     * @returns {Promise<boolean>} Resolves to a boolean.
     */
    async findHouseOnRemote(house: string): Promise<boolean>
    {
        const response = await this.request.get('/houses');
        return response.data.houses.some(h => h.id === house);
    }

    /**
     * Checks whether there's a house with the provided ID on the local DB.
     *
     * @param {string} house House ID.
     *
     * @returns {Promise<boolean>} Resolves to a boolean.
     */
    findHouseOnLocal(house: string): Promise<boolean>
    {
        return this.repo.exists(house);
    }
}