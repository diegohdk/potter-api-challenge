'use strict';

const mongoose = require('mongoose');
const CastError = require('mongoose/lib/error/cast');
const ValidationError = require('mongoose/lib/error/validation');
const NotFoundError = require('../errors/NotFoundError');

/**
 * Base model class.
 */
class Model
{
    /**
     * Model definitions.
     * 
     * @type {Array<Object>}
     */
    get DEFINITION()
    {
        return {};
    }

    /**
     * Class constructor.
     */
    constructor()
    {
        this.schema = new mongoose.Schema(this.DEFINITION, {timestamps : true});
        this.model = mongoose.connection.models[this.constructor.name];

        if (!this.model) {
            this.setModel();
        }
    }

    /**
     * Model bootstrap, to set custom behavior.
     */
    bootstrap() { }

    /**
     * Throws a validation error.
     * 
     * @param {mongoose.Model} model Model instance.
     * @param {String} path Path which is the error source.
     * @param {Object} details Additional details.
     * 
     * @throws {ValidationError}
     */
    static throwError(model, path, details)
    {
        const error = new ValidationError(model);
        error.addError(path, details);
        throw error;
    }

    /**
     * Sets the model instance.
     * 
     * This should be called only one per script execution.
     */
    setModel()
    {
        this.addListMethod();
        this.addGetById();
        this.addExportMethod();
        this.addFillMethod();
        this.bootstrap();
        this.model = mongoose.model(this.constructor.name, this.schema);
    }
    
    /**
     * 
     */
    addListMethod()
    {
        this.schema.statics.list = async (filters) => {
            const records = await this.model.find(filters || {}).sort('-createdAt');
            return records.map(record => record.export());
        };
    }
    
    /**
     * 
     */
    addGetById()
    {
        this.schema.statics.getById = async (id, field) => {
            const filters = {};
            filters[field || '_id'] = id;

            const record = await this.model.where(filters).findOne().catch(error => {
                if (error instanceof CastError) {
                    error.path = 'id';
                }
    
                throw error;
            });
    
            if (!record) {
                throw new NotFoundError;
            }
    
            return record;
        };
    }

    /**
     * 
     */
    addExportMethod()
    {
        const definition = this.DEFINITION;

        this.schema.methods.export = function() {
            const data = {
                id : this.id || this._id,
                createdAt : this.createdAt,
                updatedAt : this.updatedAt,
            };

            Object.keys(definition).forEach(key => data[key] = this[key]);
            return data;
        };
    }

    /**
     * 
     */
    addFillMethod()
    {
        const definition = this.DEFINITION;

        this.schema.methods.fill = function(data) {
            Object.keys(definition).forEach(key => {
                if (typeof data[key] !== 'undefined') {
                    this[key] = data[key];
                }
            });

            return this;
        };
    }
}

module.exports = Model;