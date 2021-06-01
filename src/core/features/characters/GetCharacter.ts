import ICharacterEntity from '../../entities/ICharacterEntity';
import CharacterFeature from './CharacterFeature';

/**
 * Get a single character by its ID.
 */
export default class GetCharacter extends CharacterFeature
{
    execute(id: string): Promise<ICharacterEntity>
    {
        return this.repo.getById(id);
    }
}