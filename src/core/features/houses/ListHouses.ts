import IHouseEntity from '../../entities/IHouseEntity';
import HouseFeature from './HouseFeature';

/**
 * List available houses.
 */
export default class ListHouses extends HouseFeature
{
    execute(): Promise<IHouseEntity[]>
    {
        return this.repo.list();
    }
}