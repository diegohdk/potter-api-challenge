'use strict';

require('dotenv').config();
require('./bootstrap/db');

const axios = require('axios');
const minimist = require('minimist');
const Character = require('./models/Character');
const House = require('./models/House');
const args = minimist(process.argv.slice(2), ['email', 'password', 'name']);

axios.defaults.baseURL = 'http://us-central1-rh-challenges.cloudfunctions.net/potterApi';

function printUsage(msg, code)
{
	if(msg)
        process.stderr.write(msg);

	if(!code)
		code = 0;

	process.stderr.write('\nUsage: node init --name NAME --email EMAIL --password PASSWORD\n');
	process.exit(code);
}

function setApiKey(apiKey)
{
    axios.defaults.headers.apikey = apiKey;
}

function handleError(error)
{
    const message = error.response ? `HTTP ${error.response.status} ${error.response.statusText}: ${JSON.stringify(error.response.data)}` : error.message;
    process.stderr.write(`\nUnexpected error: ${message}\n${error.stack}\n`);
    process.exit(1);
}

async function requestApiKey(email, password, name)
{
    const data = {
        email,
        password,
        name
    };
    const response = await axios.post('/users', data).catch(handleError);

    process.stdout.write(`Your API key: ${response.data.user.apiKey}\n`);
    setApiKey(response.data.user.apiKey);
    await importContent();
}

async function importContent()
{
    await importHouses();
    await insertCharacters();
    process.stdout.write('Done\n');
    process.exit();
}

async function importHouses()
{
    const response = await axios.get('/houses').catch(handleError);
    await persistHouses(response.data.houses);
}

async function persistHouses(houses)
{
    const model = (new House).model;

    for (let house of houses) {
        house.uid = house.id;
        let exists = await model.exists({uid : house.uid});

        if (!exists) {
            process.stdout.write(`Importing house ${house.name} ${house.uid}\n`);
            await model.create(house);
        }
    }
}

async function insertCharacters()
{
    const model = (new Character).model;
    const isEmpty = (await model.count()) === 0;
    const characters = [
        {
            "name": "Harry Potter",
            "role": "Student",
            "school": "Hogwarts",
            "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
            "patronus": "Stag"
        },
        {
            "name": "Hermione Granger",
            "role": "Student",
            "school": "Hogwarts",
            "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
            "patronus": "Otter"
        },
        {
            "name": "Ron Weasley",
            "role": "Student",
            "school": "Hogwarts",
            "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
            "patronus": "Jack Russell Terrier"
        }
    ];

    if (isEmpty) {
        process.stdout.write("Importing characters\n");
        await model.create(characters);
    }
}

async function init()
{
    if (process.env.API_KEY) {
        setApiKey(process.env.API_KEY);
        await importContent();
    } else if (args.email && args.password && args.name) {
        await requestApiKey(args.email, args.password, args.name);
    } else {
        printUsage('Invalid arguments!', 1);
    }
}

init();