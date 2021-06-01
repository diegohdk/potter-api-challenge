import { config } from 'dotenv'; config();
import mongoose from 'mongoose';
import { stop } from 'mongo-unit';
import connectDb from './db';
import { server as http } from '../../src/infra/http';
import { server as db } from '../../src/infra/databases';

const isMongoDB = process.env.DB === 'mongodb';

export const mochaHooks = {
    async beforeAll(): Promise<void> {
        await http.initialize();
        await db.initialize();
        this.app = http.getEngine();

        if (isMongoDB) {
            await connectDb();
            console.log('DB connected')
        }
    },
    async afterAll(): Promise<void> {
        if (isMongoDB) {
            await mongoose.disconnect();
            await stop();
        }
    }
};