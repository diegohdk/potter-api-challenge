import EntityAdapter from '../../../adapters/repositories/EntityAdapter';
import NotFoundError from '../../../common/errors/NotFoundError';
import HouseEntity from '../../../core/entities/HouseEntity';
import IHouseRepository from '../../../core/repositories/IHouseRepository';
import { HouseModel } from '../../databases/mongodb/models/House';

/**
 * House repository class.
 */
export default class HouseRepositoryMongoDB implements IHouseRepository
{
    /**
     * List houses.
     *
     * @param {any} filters Parameters to filter the query.
     *
     * @returns {Promise<HouseEntity[]>}
     */
    async list(filters: any = {}): Promise<HouseEntity[]>
    {
        const records = await HouseModel.find(filters).sort('-createdAt');
        return records.map(record => EntityAdapter.create(record.toObject(), HouseEntity));
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
        const record = await HouseModel.findOne({ uid: id });

        if (!record) {
            throw new NotFoundError();
        }

        return EntityAdapter.create(record.toObject(), HouseEntity);
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
        const exists = await HouseModel.exists({ id });
        return exists === true;
    }
}