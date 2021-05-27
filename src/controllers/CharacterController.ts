import CreateCharacter from '../core/features/characters/CreateCharacter';
import DeleteCharacter from '../core/features/characters/DeleteCharacter';
import GetCharacter from '../core/features/characters/GetCharacter';
import ListCharacters from '../core/features/characters/ListCharacters';
import UpdateCharacter from '../core/features/characters/UpdateCharacter';
import IHouseAPI from '../core/features/characters/IHouseAPI';
import Context from '../adapters/http/Context';
import ICharacterRepository from '../core/repositories/ICharacterRepository';
import Controller from './Controller';

/**
 * Character controller.
 */
export default class CharacterController extends Controller<ICharacterRepository>
{
    private houseAPI: IHouseAPI

    constructor(repo: ICharacterRepository, houseAPI?: IHouseAPI)
    {
        super(repo);
        this.houseAPI = houseAPI;
    }

    setHouseAPI(houseAPI: IHouseAPI)
    {
        this.houseAPI = houseAPI;
    }

    async index(context: Context): Promise<any[]>
    {
        const feature = new ListCharacters(this.repo);
        return await feature.execute(context?.query);
    }

    async read(context: Context): Promise<any>
    {
        const feature = new GetCharacter(this.repo);
        return await feature.execute(context.params.id);
    }

    async create(context: Context): Promise<any>
    {
        const feature = new CreateCharacter(this.repo);
        feature.setHouseAPI(this.houseAPI);
        return await feature.execute(context.body);
    }

    async update(context: Context): Promise<void>
    {
        const feature = new UpdateCharacter(this.repo);
        feature.setHouseAPI(this.houseAPI);
        await feature.execute(context.params.id, context.body);
    }

    async delete(context: Context): Promise<void>
    {
        const feature = new DeleteCharacter(this.repo);
        await feature.execute(context.params.id);
    }
}