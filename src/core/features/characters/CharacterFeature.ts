import ICharacterRepository from '../../repositories/ICharacterRepository';
import IFeature from '../IFeature';

/**
 * Base chacarter feature class.
 */
export default abstract class CharacterFeature implements IFeature
{
    constructor(protected repo: ICharacterRepository) { }
}