import log from '../../../common/utils/log';
import ICharacterEntity from '../../../core/entities/ICharacterEntity';
import IHouseEntity from '../../../core/entities/IHouseEntity';
import IServer from '../../IServer';
import Collection from './Collection';
import IEntityType from './IEntityType';

interface ICollections
{
    characters: Collection<ICharacterEntity>,
    houses: Collection<IHouseEntity>
}

export default class MemoryDatabaseServer implements IServer
{
    private collections: ICollections;

    constructor()
    {
        this.collections = {
            characters: new Collection<ICharacterEntity>(),
            houses: new Collection<IHouseEntity>()
        };
    }

    async initialize(): Promise<void>
    {
        for (const key in this.collections) {
            const collection: Collection<any> = this.collections[key];
            const path = `../../../../mock/${key}.json`;
            const data = await import(path);
            data.default.forEach(item => collection.create(item));
        }
    }

    async connect(): Promise<void>
    {
        this.initialize();
        log('In-memory DB ready');
    }

    getEngine(): any
    {
        return this;
    }

    getCollection<Entity extends IEntityType>(name: string): Collection<Entity>
    {
        return this.collections[name];
    }
}

export const db = new MemoryDatabaseServer();