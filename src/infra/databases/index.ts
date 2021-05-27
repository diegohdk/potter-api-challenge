import IServer from '../IServer';
import MongoDBServer from './mongodb/MongoDBServer';
import MemoryDatabaseServer from './inmemory/MemoryDatabaseServer';

let server: IServer;

if (process.env.DB === 'mongodb') {
    server = new MongoDBServer();
} if (process.env.DB === 'inmemory') {
    server = new MemoryDatabaseServer();
}

export {
    server
};