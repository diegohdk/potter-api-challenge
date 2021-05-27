import Entity from './Entity';
import IHouseEntity from './IHouseEntity';

/**
 * House entity.
 */
export default class HouseEntity extends Entity implements IHouseEntity
{
    public id: string = null
    public uid: string = null
    public name: string = null
    public mascot: string = null
    public houseGhost: string = null
    public values: string[] = []
    public school: string = null
    public headOfHouse: string = null
    public founder: string = null
    public colors: string[] = []
    public createdAt: Date = null
    public updatedAt: Date = null

    constructor(values: any = {})
    {
        super();
        this.fill(values);
    }
}