import { expect } from 'chai';
import request from 'supertest';
import ICharacterEntity from '../../src/core/entities/ICharacterEntity';
import ICharacterRepository from '../../src/core/repositories/ICharacterRepository';
import { default as repos } from '../../src/infra/repositories';

const { CharacterRepository } = repos;
const characterRepo: ICharacterRepository = new CharacterRepository();

async function getCharacter(name: string): Promise<ICharacterEntity>
{
    const result = await characterRepo.list({ name });
    return result[0];
}

describe('Character API tests', () => {
    describe('GET /characters', () => {
        it('should be 200 OK and have 4 characters', async function() {
            await request(this.app)
                .get('/characters')
                .expect(200)
                .expect(res => expect(res.body.length).to.be.equal(4));
        });

        it('should be 200 OK and have 1 filtered character', async function() {
            await request(this.app)
                .get('/characters?house=df01bd60-e3ed-478c-b760-cdbd9afe51fc')
                .expect(200)
                .expect(res => expect(res.body.length).to.be.equal(1))
                .expect(res => expect(res.body[0]).to.have.property('name').equal('Severus Snape'));
        });
    });

    describe('GET /characters/:id', () => {
        it('should be 200 OK and return Harry Potter', async function() {
            const record = await getCharacter('Harry Potter');
            await request(this.app)
                .get(`/characters/${record.id}`)
                .expect(200)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => expect(res.body).to.have.property('name').equal('Harry Potter'));
        });

        it('should be 404 Not Found', async function() {
            await request(this.app)
                .get('/characters/603a653946d3d000b6bc9523')
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });

    describe('POST /characters', () => {
        it('should be 201 Created and create a new character', async function() {
            const payload = {
                name: 'Albus Dumbledore',
                role: 'Professor',
                school: 'Hogwarts',
                house: '1760529f-6d51-4cb1-bcb1-25087fce5bde',
                patronus: 'Phoenix'
            };

            await request(this.app)
                .post('/characters')
                .send(payload)
                .expect(201)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => expect(res.body).to.have.property('name').equal(payload.name));
        });

        it('should be 201 Created and create a new character with name and house only', async function() {
            const payload = {
                name: 'Albus Dumbledore',
                house: '1760529f-6d51-4cb1-bcb1-25087fce5bde'
            };

            await request(this.app)
                .post('/characters')
                .send(payload)
                .expect(201)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => expect(res.body).to.have.property('name').equal(payload.name))
                .expect(res => expect(res.body).to.have.property('house').equal(payload.house));
        });

        it('should be 422 Unprocessable Entity', async function() {
            const payload = {
                name: 'Albus Dumbledore'
            };

            await request(this.app)
                .post('/characters')
                .send(payload)
                .expect(422)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => expect(res.body).to.have.property('error').equal('Invalid house ID'));
        });
    });

    describe('PUT /characters/:id', () => {
        const payload: { name: any, role: any } = {
            name: 'Harry P.',
            role: 'Professor'
        };

        it('should be 204 No Content and update the character', async function() {
            let record = await getCharacter('Harry Potter');
            await request(this.app)
                .put(`/characters/${record.id}`)
                .send(payload)
                .expect(204);

            record = await getCharacter(payload.name);
            expect(record).to.be.ok;
            expect(record.role).to.be.equal(payload.role);
        });

        it('should be 404 Not Found', async function() {
            await request(this.app)
                .put('/characters/603a653946d3d000b6bc9523')
                .send(payload)
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });

    describe('DELETE /characters/:id', () => {
        it('should be 204 No Content and delete the character', async function() {
            const name = 'Ron Weasley';
            let record = await getCharacter(name);

            await request(this.app)
                .delete(`/characters/${record.id}`)
                .expect(204);

            record = await getCharacter(name);
            expect(record).to.be.undefined;
        });

        it('should be 404 Not Found', async function() {
            await request(this.app)
                .delete('/characters/603a653946d3d000b6bc9523')
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });
});