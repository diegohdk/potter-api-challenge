import CharacterEntity from '../../entities/CharacterEntity';
import CharacterFeature from './CharacterFeature';

/**
 * List available characters.
 */
export default class ListCharacters extends CharacterFeature
{
    execute(params: any): Promise<CharacterEntity[]>
    {
        const filters: any = {};

        if (params?.house) {
            filters.house = params.house;
        }

        return this.repo.list(filters);
    }
}