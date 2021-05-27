import { NextFunction, Request, RequestHandler, Response } from 'express';
import HttpAdapter from './HttpAdapter';
import IRepository from '../../core/repositories/IRepository';
import Context from './Context';

/**
 * Express adapter class.
 */
export default class ExpressAdapter extends HttpAdapter<IRepository>
{
    create(handler: Function): RequestHandler
    {
        return (req: Request, res: Response, next: NextFunction): void => {
            const context: Context = Context.create(req.body, req.params, req.query);
            const status: number = this.getStatusCode(req);

            handler.call(this.controller, context)
                .then((response: any) => res.status(status).json(response))
                .catch(next);
        }
    }

    getStatusCode(req: Request)
    {
        if (req.method === 'POST') {
            return 201;
        } else if (req.method === 'PUT' || req.method === 'DELETE') {
            return 204;
        } else {
            return 200;
        }
    }
}