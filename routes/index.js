'use strict';

const express = require('express');
const fs = require('fs');

function getRoutes()
{
    return fs.readdirSync(__dirname)
        .filter(file => !/^(\.|index)/.test(file))
        .map(route => route.replace(/\.js$/, ''));
}

module.exports = app => {
    const routes = getRoutes();

    routes.forEach(route => {
        const router = express.Router();
        require(`./${route}`)(router);
        app.use(`/${route}`, router);
    });
};