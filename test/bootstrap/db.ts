import mongoose from 'mongoose';
import { start } from 'mongo-unit';
import { server as db } from '../../src/infra/databases/index';

async function importRecords(modelName: string): Promise<void>
{
    const documents = await import(`../../mock/${modelName.toLowerCase()}s`);
    const model = mongoose.connection.models[modelName];

    try {
        await model.insertMany(documents);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default async () => {
    console.log('Connecting DB...')
    process.env.DB_URI = await start();
    console.log(process.env.DB_URI);
    await db.connect();
    await importRecords('House');
    await importRecords('Character');
};