import CharacterFeature from './CharacterFeature';
import NotFoundError from '../../../common/errors/NotFoundError';

/**
 * Delete an existing character by its ID.
 */
export default class DeleteCharacter extends CharacterFeature
{
    async execute(id: string): Promise<void>
    {
        const success = await this.repo.delete(id);

        if (!success) {
            throw new NotFoundError();
        }
    }
}