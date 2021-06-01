import EntityAdapter from '../../../adapters/repositories/EntityAdapter';
import NotFoundError from '../../../common/errors/NotFoundError';
import HouseEntity from '../../../core/entities/HouseEntity';
import IHouseRepository from '../../../core/repositories/IHouseRepository';
import Collection from '../../databases/inmemory/Collection';
import { db } from '../../databases/inmemory/MemoryDatabaseServer';

/**
 * House repository class.
 */
export default class HouseRepositoryInMemory implements IHouseRepository
{
    private get collection(): Collection<HouseEntity>
    {
        return db.getCollection('houses');
    }

    /**
     * List houses.
     *
     * @param {any} filters Parameters to filter the query.
     *
     * @returns {Promise<HouseEntity[]>}
     */
    async list(filters: any = {}): Promise<HouseEntity[]>
    {
        const records = this.collection.find(filters);
        return records.map(record => EntityAdapter.create(record, HouseEntity));
    }

    /**
     * Returns a single entity by its ID.
     *
     * @param {string} id Entity ID.
     *
     * @returns {Promise<HouseEntity>}
     */
    async getById(id: string): Promise<HouseEntity>
    {
        const record = this.collection.findById(id);

        if (!record) {
            throw new NotFoundError();
        }

        return EntityAdapter.create(record, HouseEntity);
    }

    /**
     * Returns a single entity by its ID.
     *
     * @param {string} id Entity ID.
     *
     * @returns {Promise<boolean>}
     */
    async exists(id: string): Promise<boolean>
    {
        return this.collection.exists(id);
    }
}