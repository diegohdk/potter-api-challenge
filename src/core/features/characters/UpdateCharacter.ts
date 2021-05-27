import mixin from '../../../common/utils/mixin';
import CharacterEntity from '../../entities/CharacterEntity';
import CharacterFeature from './CharacterFeature';
import HouseValidation from './HouseValidation';

export default interface UpdateCharacter extends HouseValidation { }

/**
 * Update an existing character by its ID.
 */
@mixin(HouseValidation)
export default class UpdateCharacter extends CharacterFeature
{
    async execute(id: string, data: any): Promise<boolean>
    {
        if (data.house) {
            await this.validateHouse(data.house);
        }

        const entity: CharacterEntity = await this.repo.getById(id);
        entity.fill(data);
        return await this.repo.save(entity);
    }
}