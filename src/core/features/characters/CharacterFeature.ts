import ICharacterRepository from '../../repositories/ICharacterRepository';
import IFeature from '../IFeature';

export default interface CharacterFeature extends IFeature { }

/**
 * Base chacarter feature class.
 */
export default abstract class CharacterFeature
{
    constructor(protected repo: ICharacterRepository) { }
}