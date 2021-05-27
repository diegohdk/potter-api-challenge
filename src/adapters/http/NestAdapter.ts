import HttpAdapter from './HttpAdapter';
import Context from './Context';
import IRepository from '../../core/repositories/IRepository';

/**
 * Express adapter class.
 */
export default class NestAdapter extends HttpAdapter<IRepository>
{
    async create(handler: Function, context?: Context): Promise<any>
    {
        const response: any = await handler.call(this.controller, context);
        return response;
    }
}