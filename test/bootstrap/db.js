'use strict';

process.env.DB_URI += '-test';
const db = require('../../bootstrap/db');

async function importRecords(modelName)
{
    const ModelClass = require(`../../models/${modelName}`);
    const documents = require(`../../data/${modelName.toLowerCase()}s`);
    const model = (new ModelClass).model;

    try {
        await model.insertMany(documents);
    } catch (error) {
        console.error(error);
    }
}

module.exports = () => {
    return new Promise(done => {
        db.connection.on('connected', async () => {
            await importRecords('House');
            await importRecords('Character');
            done(db);
        });
    })
};