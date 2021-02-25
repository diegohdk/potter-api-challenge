'use strict';

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
        const houseModel = (new House).model;
        this.schema.post('validate', async record => {
            const exists = await houseModel.exists({uid : record.house});

            if (!exists) {
                House.throwError(record, 'house', {message : `Invalid house ${record.house}`});
            }
        });
    }
}

module.exports = Character;