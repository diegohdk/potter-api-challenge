'use strict';

const APIClient = require('../lib/APIClient');
const Model = require('./Model');
const House = require('./House');

/**
 * Model for the character actor.
 */
class Character extends Model
{
    /**
     * Model definitions.
     *
     * @type {Array<Object>}
     */
    get DEFINITION()
    {
        return {
            name : {
                type : String,
                required : true
            },
            role : {
                type : String,
                default : null
            },
            school : {
                type : String,
                default : null
            },
            house : {
                type : String,
                required : true
            },
            patronus : {
                type : String,
                default : null
            },
        };
    }

    /**
     * Model bootstrap, to set custom behavior.
     */
    bootstrap()
    {
        this.schema.post('validate', async record => {
            const invalid = await APIClient.create().validateHouse(record.house) !== true;

            if (invalid) {
                House.throwError(record, 'house', {message : `Invalid house ${record.house}`});
            }
        });
    }
}

module.exports = Character;