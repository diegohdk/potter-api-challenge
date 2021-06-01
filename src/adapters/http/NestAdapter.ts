import HttpAdapter from './HttpAdapter';
import Context from './Context';
import IRepository from '../../core/repositories/IRepository';
import IHandler from './IHandler';

/**
 * Express adapter class.
 */
export default class NestAdapter extends HttpAdapter<IRepository>
{
    async create(handler: IHandler, context?: Context): Promise<any>
    {
        const response: any = await handler.call(this.controller, context);
        return response;
    }
}