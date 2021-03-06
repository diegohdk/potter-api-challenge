'use strict';

const assert = require('assert');
const request = require('supertest');
const app = require('../../bootstrap/http');
const Character = require('../../models/Character');

function getCharacter(name)
{
    const model = (new Character).model;
    return model.findOne({ name });
}

describe('Character API tests', function() {
    describe('GET /characters', function() {
        it('should be 200 OK and have 4 characters', async function() {
            await request(app)
                .get('/characters')
                .expect(200)
                .expect(res => assert.strictEqual(res.body.length, 4));
        });

        it('should be 200 OK and have 1 filtered character', async function() {
            await request(app)
                .get('/characters?house=df01bd60-e3ed-478c-b760-cdbd9afe51fc')
                .expect(200)
                .expect(res => assert.strictEqual(res.body.length, 1))
                .expect(res => assert.strictEqual(res.body[0].name, 'Severus Snape'));
        });
    });

    describe('GET /characters/:id', function() {
        it('should be 200 OK and return Harry Potter', async function() {
            const record = await getCharacter('Harry Potter');
            await request(app)
                .get(`/characters/${record._id}`)
                .expect(200)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => assert.strictEqual(res.body.name, 'Harry Potter'));
        });

        it('should be 404 Not Found', async function() {
            await request(app)
                .get('/characters/603a653946d3d000b6bc9523')
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });

    describe('POST /characters', function() {
        it('should be 201 Created and create a new character', async function() {
            const payload = {
                name : 'Albus Dumbledore',
                role : 'Professor',
                school : 'Hogwarts',
                house : '1760529f-6d51-4cb1-bcb1-25087fce5bde',
                patronus : 'Phoenix'
            };

            await request(app)
                .post('/characters')
                .send(payload)
                .expect(201)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => assert.strictEqual(res.body.name, payload.name));
        });

        it('should be 201 Created and create a new character with name and house only', async function() {
            const payload = {
                name : 'Albus Dumbledore',
                house : '1760529f-6d51-4cb1-bcb1-25087fce5bde'
            };

            await request(app)
                .post('/characters')
                .send(payload)
                .expect(201)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => assert.strictEqual(res.body.name, payload.name))
                .expect(res => assert.strictEqual(res.body.house, payload.house))
                .expect(res => assert.ifError(res.body.role))
                .expect(res => assert.ifError(res.body.school))
                .expect(res => assert.ifError(res.body.patronus));
        });

        it('should be 422 Unprocessable Entity', async function() {
            const payload = {
                name : 'Albus Dumbledore'
            };

            await request(app)
                .post('/characters')
                .send(payload)
                .expect(422)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => assert.strictEqual(res.body.error, 'The request data is invalid'))
                .expect(res => assert.ok(res.body.details.house));
        });
    });

    describe('PUT /characters/:id', function() {
        const payload = {
            name : 'Harry P.',
            role : 'Professor'
        };

        it('should be 204 No Content and update the character', async function() {
            let record = await getCharacter('Harry Potter');
            await request(app)
                .put(`/characters/${record._id}`)
                .send(payload)
                .expect(204);

            record = await getCharacter(payload.name);
            assert.ok(record);
            assert.strictEqual(record.role, payload.role);
        });

        it('should be 422 Unprocessable Entity (name is boolean)', async function() {
            let record = await getCharacter('Harry P.');
            payload.name = true;
            await request(app)
                .put(`/characters/${record._id}`)
                .send(payload)
                .expect(422)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => assert.strictEqual(res.body.details.name, 'Cast to string failed for value "true" at path "name"'));
        });

        it('should be 422 Unprocessable Entity (name is null)', async function() {
            let record = await getCharacter('Harry P.');
            payload.name = null;
            await request(app)
                .put(`/characters/${record._id}`)
                .send(payload)
                .expect(422)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => assert.strictEqual(res.body.details.name, 'Path `name` is required.'));
        });

        it('should be 404 Not Found', async function() {
            await request(app)
                .put('/characters/603a653946d3d000b6bc9523')
                .send(payload)
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });

    describe('DELETE /characters/:id', function() {
        it('should be 204 No Content and delete the character', async function() {
            const name = 'Ron Weasley';
            let record = await getCharacter(name);

            await request(app)
                .delete(`/characters/${record._id}`)
                .expect(204);

            record = await getCharacter(name);
            assert.ifError(record);
        });

        it('should be 404 Not Found', async function() {
            await request(app)
                .delete('/characters/603a653946d3d000b6bc9523')
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });
});