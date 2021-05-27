import IHouseEntity from '../../entities/IHouseEntity';
import HouseFeature from './HouseFeature';

/**
 * Get a single house by its ID.
 */
export default class GetHouse extends HouseFeature
{
    execute(id: string): Promise<IHouseEntity>
    {
        return this.repo.getById(id);
    }
}