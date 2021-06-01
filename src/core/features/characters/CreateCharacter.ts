import mixin from '../../../common/utils/mixin';
import ICharacterEntity from '../../entities/ICharacterEntity';
import CharacterFeature from './CharacterFeature';
import HouseValidation from './HouseValidation';

export default interface CreateCharacter extends HouseValidation { }

/**
 * Create a new character.
 */
@mixin(HouseValidation)
export default class CreateCharacter extends CharacterFeature
{
    async execute(data: any): Promise<ICharacterEntity>
    {
        await this.validateHouse(data.house);
        const entity: ICharacterEntity = await this.repo.create(data);
        return entity;
    }
}