'use strict';

const Model = require('./Model');

/**
 * Model for the house actor.
 */
class House extends Model
{
    /**
     * Model definitions.
     * 
     * @type {Array<Object>}
     */
    get DEFINITION()
    {
        return {
            uid : {
                type : String,
                required : true,
                unique : true
            },
            name : {
                type : String,
                required : true
            },
            mascot : {
                type : String,
                default : null
            },
            houseGhost : {
                type : String,
                default : null
            },
            values : {
                type : Array,
                default : []
            },
            school : {
                type : String,
                default : null
            },
            headOfHouse : {
                type : String,
                default : null
            },
            founder : {
                type : String,
                default : null
            },
            colors : {
                type : Array,
                default : []
            }
        };
    }
}

module.exports = House;