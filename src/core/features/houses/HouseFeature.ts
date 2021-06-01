import IFeature from '../IFeature';
import IHouseRepository from '../../repositories/IHouseRepository';

export default interface HouseFeature extends IFeature { }

/**
 * Base house feature class.
 */
export default abstract class HouseFeature
{
    constructor(protected repo: IHouseRepository) { }
}