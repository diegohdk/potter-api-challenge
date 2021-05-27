import mixin from '../../../common/utils/mixin';
import CharacterEntity from '../../entities/CharacterEntity';
import CharacterFeature from './CharacterFeature';
import HouseValidation from './HouseValidation';

export default interface CreateCharacter extends HouseValidation { }

/**
 * Create a new character.
 */
@mixin(HouseValidation)
export default class CreateCharacter extends CharacterFeature
{
    async execute(data: any): Promise<CharacterEntity>
    {
        await this.validateHouse(data.house);
        const entity: CharacterEntity = await this.repo.create(data);
        return entity;
    }
}