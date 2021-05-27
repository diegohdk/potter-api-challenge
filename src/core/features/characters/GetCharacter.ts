import CharacterEntity from '../../entities/CharacterEntity';
import CharacterFeature from './CharacterFeature';

/**
 * Get a single character by its ID.
 */
export default class GetCharacter extends CharacterFeature
{
    execute(id: string): Promise<CharacterEntity>
    {
        return this.repo.getById(id);
    }
}