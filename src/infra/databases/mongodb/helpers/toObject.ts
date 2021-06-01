import { Document } from 'mongoose';

export default {
    transform(doc: Document, ret: any): any {
        ret.id = ret.id ?? ret._id;
        delete ret._id;
        return ret;
    }
}