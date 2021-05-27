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
    private static instance: MemoryDatabaseServer;
    private collections: ICollections;

    constructor()
    {
        this.collections = {
            characters: new Collection<ICharacterEntity>(),
            houses: new Collection<IHouseEntity>()
        };

        this.initialize();
    }

    static getInstance(): MemoryDatabaseServer
    {
        if (!MemoryDatabaseServer.instance) {
            MemoryDatabaseServer.instance = new MemoryDatabaseServer();
        }

        return MemoryDatabaseServer.instance;
    }

    async initialize(): Promise<void>
    {
        for (let key in this.collections) {
            const collection: Collection<any> = this.collections[key];
            const path = `../../../../mock/${key}.json`;
            const data = require(path);
            data.forEach(item => collection.create(item));
        }
    }

    async connect(): Promise<void> { }

    getEngine(): any { }

    getCollection<Entity extends IEntityType>(name: string): Collection<Entity>
    {
        return this.collections[name];
    }
}