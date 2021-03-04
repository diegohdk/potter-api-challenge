'use strict';

const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = require('../../bootstrap/http');

describe('Server tests', function() {
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
                assert.strictEqual(error.code, 'EADDRINUSE');
                close(server1, server2);
            });
        });
    });

    it('should throw an error (code)', function() {
        try {
            let error = new Error('Catch me!');
            error.code = 'ECATCHME';
            app.emit('error', error);
            assert.fail("Didn't throw the error");
        } catch (error) {
            assert.strictEqual(error.code, 'ECATCHME');
        }
    });

    it('should throw an error (syscall)', function() {
        try {
            let error = new Error('Catch me!');
            error.syscall = 'listen';
            app.emit('error', error);
            assert.fail("Didn't throw the error");
        } catch (error) {
            assert.strictEqual(error.syscall, 'listen');
        }
    });

    it('should be 404 Not Found', async function() {
        await request(app)
            .get('/invalidroute')
            .expect(404)
            .expect('Content-type', /^application\/json.*/)
            .expect(res => assert.strictEqual(res.body.error, 'Cannot GET /invalidroute'));
    });
});