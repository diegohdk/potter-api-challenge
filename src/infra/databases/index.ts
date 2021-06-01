import IServer from '../IServer';
import { db as mongodb } from './mongodb/MongoDBServer';
import { db as inmemory } from './inmemory/MemoryDatabaseServer';

let server: IServer;

if (process.env.DB === 'mongodb') {
    server = mongodb;
} if (process.env.DB === 'inmemory') {
    server = inmemory;
}

export {
    server
};