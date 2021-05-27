import IController from './IController';

export default abstract class Controller<RepositoryType> implements IController<RepositoryType>
{
    constructor(protected repo: RepositoryType) { }

    setRepository(repo: RepositoryType): void
    {
        this.repo = repo;
    }
}