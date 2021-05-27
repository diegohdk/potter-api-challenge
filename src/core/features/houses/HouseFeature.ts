import IFeature from '../IFeature';
import IHouseRepository from '../../repositories/IHouseRepository';

/**
 * Base house feature class.
 */
export default abstract class HouseFeature implements IFeature
{
    constructor(protected repo: IHouseRepository) { }
}