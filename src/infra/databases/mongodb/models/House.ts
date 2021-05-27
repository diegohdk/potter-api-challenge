import mongoose, { Document, Model, Schema } from 'mongoose'
import IHouseEntity from '../../../../core/entities/IHouseEntity';
import toObject from '../helpers/toObject'

interface IHouseDocument extends IHouseEntity, Document {
    id: any
}

interface IHouseModelDocument extends Model<IHouseDocument> {}

const schema = new Schema({
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
}, { timestamps : true })

schema.set('toObject', toObject);

export const HouseModel = mongoose.model<IHouseDocument, IHouseModelDocument>('House', schema)