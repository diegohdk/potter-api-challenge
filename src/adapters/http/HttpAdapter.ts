import IController from '../../controllers/IController';

export default abstract class HttpAdapter<RepositoryType>
{
    constructor(protected controller: IController<RepositoryType>) { }

    setController(controller: IController<RepositoryType>): void
    {
        this.controller = controller;
    }
}