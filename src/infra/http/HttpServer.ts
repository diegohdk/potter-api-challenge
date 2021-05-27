import IServer from '../IServer';

export default interface HttpServer extends IServer {}

export default abstract class HttpServer
{
    get IS_NOT_TEST(): boolean
    {
        return process.env.NODE_ENV !== 'test';
    }
}