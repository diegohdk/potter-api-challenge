import IHouseEntity from '../entities/IHouseEntity';
import IRepository from './IRepository';

/**
 * House repository interface.
 */
export default interface IHouseRepository extends IRepository
{
    list(filters?: any): Promise<IHouseEntity[]>
    getById(id: string): Promise<IHouseEntity>
    exists(id: string): Promise<boolean>
}