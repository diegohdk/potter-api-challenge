import mongoose, { Document, Model, Schema } from 'mongoose'
import ICharacterEntity from '../../../../core/entities/ICharacterEntity';
import toObject from '../helpers/toObject'

interface ICharacterDocument extends ICharacterEntity, Document {
    id: any
}

interface ICharacterModelDocument extends Model<ICharacterDocument> {}

const schema = new Schema({
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
    }
}, { timestamps : true })

schema.set('toObject', toObject);

export const CharacterModel = mongoose.model<ICharacterDocument, ICharacterModelDocument>('Character', schema)