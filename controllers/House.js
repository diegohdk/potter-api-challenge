'use strict';

const Controller = require('./Controller');

/**
 * House controller.
 */
class House extends Controller
{
    /**
     * List all houses.
     */
    async index(req, res)
    {
        const data = await this.model.list();
        this.send(res, data);
    }

    /**
     * Get a house.
     */
    async read(req, res)
    {
        const data = await this.model.getById(req.params.uid, 'uid');
        this.send(res, data.export());
    }
}

module.exports = House;