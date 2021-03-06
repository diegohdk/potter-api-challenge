'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const log = require('../services/log');
const routes = require('../routes');
const NotFoundError = require('../errors/NotFoundError');
const HttpError = require('../errors/HttpError');
const CastError = require('mongoose/lib/error/cast');
const ValidationError = require('mongoose/lib/error/validation');

const app = express();
const isNotTest = process.env.NODE_ENV !== 'test';

if (isNotTest) {
    app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin : new RegExp(process.env.CORS_ORIGIN),
    methods : ['GET', 'POST', 'PUT', 'DELETE']
}));

// disable response cache
app.set('etag', false);
app.use((req, res, next) => {
    res.setHeader('Cache-control', 'no-store');
    next();
});

// mount routes
routes(app);

// routes not found
app.use((req, res, next) => {
    res.status(404).json({error : `Cannot ${req.method} ${req.path}`});
});

// default error handler
app.use((error, req, res, next) => {
    // we need the "next" argument here, even not using it
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    const errorResponse = {};
    let logMessage = error.stack;
    let status = 500;

    if (error instanceof NotFoundError) {
        errorResponse.error = 'The resource you are looking for does not exist';
        status = 404;
        logMessage = null;
    } else if (error instanceof ValidationError) {
        errorResponse.error = 'The request data is invalid';
        errorResponse.details = {};
        status = 422;
        logMessage = null;
        Object.entries(error.errors).map(entry => errorResponse.details[entry[0]] = entry[1].message);
    } else if (error instanceof CastError) {
        errorResponse.error = `The provied value for ${error.path} is invalid`;
        status = 422;
        logMessage = null;
    } else if (error instanceof HttpError) {
        errorResponse.error = 'Sorry, we could not process your request';
    } else {
        errorResponse.error = 'Ops! Something went wrong here';
    }

    if (logMessage) {
        let uri = `${req.method} ${req.protocol}://${req.headers.host}${req.url}`;
        log(uri, logMessage);
    }

    res.status(status).json(errorResponse);
});

app.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const port = process.env.PORT;
    const bind = (Number.isNaN(port) ? 'Pipe ' : 'Port ') + port;
    const server = app.get('server');

    // handle specific listen errors with friendly messages
    switch (error.code)
    {
        case 'EACCES':
            log(`${bind} requires elevated privileges`);
            break;
        case 'EADDRINUSE':
            log(`${bind} is already in use`);
            break;
        default:
            throw error;
    }

    server && server.close();
    isNotTest && process.exit(1);
});

if (isNotTest) {
    const server = app.listen(process.env.PORT, () => log(`HTTP server listening on port ${process.env.PORT}`));
    app.set('server', server);
    server.on('error', error => app.emit('error', error));
}

module.exports = app;