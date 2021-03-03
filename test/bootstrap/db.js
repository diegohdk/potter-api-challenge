'use strict';

const mongoUnit = require('mongo-unit');

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

module.exports = async () => {
    process.env.DB_URI = await mongoUnit.start();
    require('../../bootstrap/db');
    await importRecords('House');
    await importRecords('Character');
};