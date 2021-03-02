'use strict';

const assert = require('assert');
const request = require('supertest');
const app = require('../../bootstrap/http');

describe('House API tests', function() {
    describe('GET /house', function() {
        it('should be 200 OK and have 4 houses', async function() {
            await request(app)
                .get('/house')
                .expect(200)
                .expect(res => assert.strictEqual(res.body.length, 4));
        });
    });

    describe('GET /house/:id', function() {
        it('should be 200 OK and return Gryffindor', async function() {
            await request(app)
                .get('/house/1760529f-6d51-4cb1-bcb1-25087fce5bde')
                .expect(200)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => assert.strictEqual(res.body.name, 'Gryffindor'));
        });

        it('should be 404 Not Found', async function() {
            await request(app)
                .get('/house/1760529f-6d51-4cb1-bcb1-25087fce5bdf')
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });
});