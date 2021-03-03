'use strict';

const assert = require('assert');
const request = require('supertest');
const app = require('../../bootstrap/http');

describe('House API tests', function() {
    describe('GET /houses', function() {
        it('should be 200 OK and have 4 houses', async function() {
            await request(app)
                .get('/houses')
                .expect(200)
                .expect(res => assert.strictEqual(res.body.length, 4));
        });
    });

    describe('GET /houses/:id', function() {
        it('should be 200 OK and return Gryffindor', async function() {
            await request(app)
                .get('/houses/1760529f-6d51-4cb1-bcb1-25087fce5bde')
                .expect(200)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => assert.strictEqual(res.body.name, 'Gryffindor'));
        });

        it('should be 404 Not Found', async function() {
            await request(app)
                .get('/houses/1760529f-6d51-4cb1-bcb1-25087fce5bdf')
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });
});