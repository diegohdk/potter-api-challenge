import IServer from '../IServer';
import ExpressServer from './express/ExpressServer';
import NestJSServer from './nestjs/NestJSServer';

let server: IServer;

if (process.env.HTTP === 'express') {
    server = new ExpressServer();
} else {
    server = new NestJSServer();
}

export {
    server
};