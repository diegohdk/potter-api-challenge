import { config } from 'dotenv'; config();
import mongoose from 'mongoose';
import { stop } from 'mongo-unit';
import connectDb from './db';

const isMongoDB = process.env.DB === 'mongodb';
export default {
    async beforeAll() {
        if (isMongoDB) {
            await connectDb();
            console.log('DB connected')
        }
    },
    async afterAll() {
        if (isMongoDB) {
            await mongoose.disconnect();
            await stop();
        }
    }
};