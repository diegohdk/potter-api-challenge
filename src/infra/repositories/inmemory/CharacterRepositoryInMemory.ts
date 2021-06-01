import EntityAdapter from '../../../adapters/repositories/EntityAdapter';
import NotFoundError from '../../../common/errors/NotFoundError';
import CharacterEntity from '../../../core/entities/CharacterEntity';
import ICharacterRepository from '../../../core/repositories/ICharacterRepository';
import Collection from '../../databases/inmemory/Collection';
import { db } from '../../databases/inmemory/MemoryDatabaseServer';

/**
 * Character repository class.
 */
export default class CharacterRepositoryInMemory implements ICharacterRepository
{
    private get collection(): Collection<CharacterEntity>
    {
        return db.getCollection('characters');
    }

    /**
     * List characters.
     *
     * @param {any} filters Parameters to filter the query.
     *
     * @returns {Promise<CharacterEntity[]>}
     */
    async list(filters: any = {}): Promise<CharacterEntity[]>
    {
        const records = this.collection.find(filters);
        return records.map(record => EntityAdapter.create(record, CharacterEntity));
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
        const record = this.collection.findById(id);

        if (!record) {
            throw new NotFoundError();
        }

        return EntityAdapter.create(record, CharacterEntity);
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
        const record = this.collection.create(data);
        return EntityAdapter.create(record, CharacterEntity);
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
        this.collection.update(data.id, data.export(['id', 'createdAt', 'updatedAt']));
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
        const result = this.collection.delete(id);
        return !!result;
    }
}