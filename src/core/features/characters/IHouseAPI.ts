import IHouseRepository from '../../repositories/IHouseRepository';

/**
 * Interface for getting houses from the remote API.
 */
export default interface IHouseAPI
{
    setRepository(repo: IHouseRepository): void
    validateHouse(house: string): Promise<boolean>
}