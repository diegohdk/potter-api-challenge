/**
 * House entity interface.
 */
export default interface IHouseEntity
{
    id: string
    uid: string
    name: string
    mascot: string
    houseGhost: string
    values: string[]
    school: string
    headOfHouse: string
    founder: string
    colors: string[]
    createdAt: Date
    updatedAt: Date
}