import Server from '../../Server';
import log from '../../../common/utils/log';
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

export default class MongoDBServer extends Server
{
    private instance: Mongoose;

    async initialize(): Promise<void>
    {
        mongoose.SchemaTypes.String.cast(false);
        mongoose.SchemaTypes.Number.cast(false);
        mongoose.SchemaTypes.Boolean.cast(false);
    }

    async connect(): Promise<void>
    {
        if (this.connected) {
            return;
        }

        const opts: ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };

        this.initialize();
        this.instance = await mongoose.connect(process.env.DB_URI, opts);
        this.instance.connection.on('disconnected', () => log('Disconnected from DB'));
        log('Connected to DB', process.env.DB_URI);
        this.connected = true;
    }

    getEngine(): any
    {
        return this.instance;
    }
}

export const db = new MongoDBServer();