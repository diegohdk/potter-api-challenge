import { expect } from 'chai';
import request from 'supertest';
import express, { Express } from 'express';
import ExpressServer from '../../src/infra/http/express/ExpressServer';

describe('ExpressServer tests', function() {
    let app: Express;

    beforeEach(async function() {
        const server = new ExpressServer();
        await server.initialize();
        app = server.getEngine();
    });

    it('should run only one instance', function(done) {
        function close(server1, server2) {
            server1.close();
            server2.close();
            done();
        }

        const testApp = express();
        const server1 = testApp.listen(process.env.PORT, () => {
            const server2 = app.listen(process.env.PORT, () => close(server1, server2));
            server2.on('error', error => {
                app.emit('error', error);
                expect(error.code).to.be.equal('EADDRINUSE');
                close(server1, server2);
            });
        });
    });

    it('should throw an error (code)', function() {
        const error = new Error('Catch me!');
        expect(() => app.emit('error', error)).to.throw(error);
    });

    // TODO: work arround this code
    // it('should throw an error (syscall)', () => {
    //     try {
    //         let error = new Error('Catch me!');
    //         error.syscall = 'listen';
    //         app.emit('error', error);
    //         assert.fail("Didn't throw the error");
    //     } catch (error) {
    //         assert.strictEqual(error.syscall, 'listen');
    //     }
    // });

    it('should be 404 Not Found', async function() {
        await request(app)
            .get('/invalidroute')
            .expect(404)
            .expect('Content-type', /^application\/json.*/)
            .expect(res => expect(res.body).to.have.property('error').equal('Cannot GET /invalidroute'));
    });
});