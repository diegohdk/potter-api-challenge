'use strict';

const Controller = require('./Controller');

/**
 * Character controller.
 */
class Character extends Controller
{
    /**
     * List all characters.
     */
    async index(req, res)
    {
        const filters = {};

        if (req.query.house) {
            filters.house = req.query.house;
        }

        const data = await this.model.list(filters);
        this.send(res, data);
    }

    /**
     * Get an character.
     */
    async read(req, res)
    {
        const data = await this.model.getById(req.params.id);
        this.send(res, data.export());
    }

    /**
     * Create a new character.
     */
    async create(req, res)
    {
        const data = await this.model.create(req.body);
        this.send(res, data.export(), 201);
    }

    /**
     * Update an existing character.
     */
    async update(req, res)
    {
        const model = await this.model.getById(req.params.id);
        model.fill(req.body);
        await model.save();
        this.send(res, null, 204);
    }

    /**
     * Delete an existing character.
     */
    async delete(req, res)
    {
        const model = await this.model.getById(req.params.id);
        await model.remove();
        this.send(res, null, 204);
    }
}

module.exports = Character;