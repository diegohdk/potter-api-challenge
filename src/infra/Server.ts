import IServer from './IServer';

export default interface Server extends IServer {}

export default abstract class Server
{
    protected connected: boolean = false

    get IS_NOT_TEST(): boolean
    {
        return process.env.NODE_ENV !== 'test';
    }

    isConnected(): boolean
    {
        return this.connected;
    }
}