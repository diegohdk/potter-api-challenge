import { expect } from 'chai';
import request from 'supertest';

describe('House API tests', () => {
    describe('GET /houses', () => {
        it('should be 200 OK and have 4 houses', async function() {
            await request(this.app)
                .get('/houses')
                .expect(200)
                .expect(res => expect(res.body.length).to.be.equal(4));
        });
    });

    describe('GET /houses/:id', () => {
        it('should be 200 OK and return Gryffindor', async function() {
            await request(this.app)
                .get('/houses/1760529f-6d51-4cb1-bcb1-25087fce5bde')
                .expect(200)
                .expect('Content-type', /^application\/json.*/)
                .expect(res => expect(res.body.name).to.be.equal('Gryffindor'));
        });

        it('should be 404 Not Found', async function() {
            await request(this.app)
                .get('/houses/1760529f-6d51-4cb1-bcb1-25087fce5bdf')
                .expect(404)
                .expect('Content-type', /^application\/json.*/);
        });
    });
});