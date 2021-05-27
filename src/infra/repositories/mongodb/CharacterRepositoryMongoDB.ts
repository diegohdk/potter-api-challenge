import EntityAdapter from '../../../adapters/repositories/EntityAdapter';
import NotFoundError from '../../../common/errors/NotFoundError';
import CharacterEntity from '../../../core/entities/CharacterEntity';
import ICharacterRepository from '../../../core/repositories/ICharacterRepository';
import { CharacterModel } from '../../databases/mongodb/models/Character';

/**
 * Character repository class.
 */
export default class CharacterRepositoryMongoDB implements ICharacterRepository
{
    /**
     * List characters.
     *
     * @param {any} filters Parameters to filter the query.
     *
     * @returns {Promise<CharacterEntity[]>}
     */
    async list(filters: any = {}): Promise<CharacterEntity[]>
    {
        const records = await CharacterModel.find(filters).sort('-createdAt');
        return records.map(record => EntityAdapter.create(record.toObject(), CharacterEntity));
    }

    /**
     * Returns a single entity by its ID.
     *
     * @param {string} id Entity ID.
     *
     * @returns {Promise<CharacterEntity>}
     */
    async getById(id: string): Promise<CharacterEntity>
    {
        const record = await CharacterModel.findById(id);

        if (!record) {
            throw new NotFoundError();
        }

        return EntityAdapter.create(record.toObject(), CharacterEntity);
    }

    /**
     * Create a new entity.
     *
     * @param {any} data Entity data.
     *
     * @returns {Promise<CharacterEntity>}
     */
    async create(data: any): Promise<CharacterEntity>
    {
        const record = await CharacterModel.create(data);
        return EntityAdapter.create(record.toObject(), CharacterEntity);
    }

    /**
     * Update an existing entity.
     *
     * @param {CharacterEntity} data Entity data.
     *
     * @returns {boolean}
     */
    async save(data: CharacterEntity): Promise<boolean>
    {
        await CharacterModel.findByIdAndUpdate(data.id, data.export(['id', 'createdAt', 'updatedAt']));
        return true;
    }

    /**
     * Delete an existing entity.
     *
     * @param {string} id Entity ID.
     *
     * @returns {boolean}
     */
    async delete(id: string): Promise<boolean>
    {
        const result = await CharacterModel.findByIdAndDelete(id);
        return !!result;
    }
}