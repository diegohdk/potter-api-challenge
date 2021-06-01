import IServer from '../IServer';
import { http as express } from './express/ExpressServer';
import { http as nestjs } from './nestjs/NestJSServer';

let server: IServer;

if (process.env.HTTP === 'express') {
    server = express;
} else {
    server = nestjs;
}

export {
    server
};