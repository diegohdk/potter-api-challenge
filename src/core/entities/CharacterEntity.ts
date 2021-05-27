import Entity from './Entity';
import ICharacterEntity from './ICharacterEntity';

/**
 * Character entity.
 */
export default class CharacterEntity extends Entity implements ICharacterEntity
{
    public id: string = null
    public name: string = null
    public role: string = null
    public school: string = null
    public house: string = null
    public patronus: string = null
    public createdAt: Date = null
    public updatedAt: Date = null

    constructor(values: any = {})
    {
        super();
        this.fill(values);
    }
}