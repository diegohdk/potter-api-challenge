/**
 * Entity adapter class.
 */
export default class EntityAdapter
{
    static create<EntityType>(data: any, type: { new(data: any): EntityType }): EntityType
    {
        return new type(data);
    }
}