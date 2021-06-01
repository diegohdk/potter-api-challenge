import Context from '../adapters/http/Context';
import IHouseEntity from '../core/entities/IHouseEntity';
import GetHouse from '../core/features/houses/GetHouse';
import ListHouses from '../core/features/houses/ListHouses';
import IHouseRepository from '../core/repositories/IHouseRepository';
import Controller from './Controller';

/**
 * House controller.
 */
export default class HouseController extends Controller<IHouseRepository>
{
    async index(): Promise<IHouseEntity[]>
    {
        const feature = new ListHouses(this.repo);
        return await feature.execute();
    }

    async read(request: Context): Promise<IHouseEntity>
    {
        const feature = new GetHouse(this.repo);
        return await feature.execute(request.params.id);
    }
}