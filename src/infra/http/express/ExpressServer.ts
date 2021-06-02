import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import log from '../../../common/utils/log';
import routes from './routes';
import { Server } from 'http';
import { handleError } from '../../../common/utils/errors';
import { default as HttpServer } from '../../Server';

export default class ExpressServer extends HttpServer
{
    private app: Express;

    async initialize(): Promise<void>
    {
        this.app = express();

        if (this.IS_NOT_TEST) {
            this.app.use(morgan('dev'));
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(cors({
            origin: new RegExp(process.env.CORS_ORIGIN),
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        }));

        // disable response cache
        this.app.set('etag', false);
        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            res.setHeader('Cache-control', 'no-store');
            next();
        });

        // mount routes
        this.app.use(routes);

        // routes not found
        /* eslint-disable @typescript-eslint/no-unused-vars */
        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
        });

        // default error handler
        this.app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
            // we need the "next" argument here, even not using it
            const { status, errorResponse, logMessage } = handleError(error);

            if (logMessage) {
                const uri = `${req.method} ${req.protocol}://${req.headers.host}${req.url}`;
                log(uri, logMessage);
            }

            res.status(status).json(errorResponse);
        });
        /* eslint-enable @typescript-eslint/no-unused-vars */

        this.app.on('error', (error: any): void => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            const port = process.env.PORT;
            const bind = (Number.isNaN(port) ? 'Pipe ' : 'Port ') + port;
            const server = this.app.get('server');

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    log(`${bind} requires elevated privileges`);
                    break;
                case 'EADDRINUSE':
                    log(`${bind} is already in use`);
                    break;
                default:
                    throw error;
            }

            server && server.close();
            this.IS_NOT_TEST && process.exit(1);
        });
    }

    async connect(): Promise<void>
    {
        if (this.connected) {
            return;
        }

        await this.initialize();

        const server: Server = this.app.listen(process.env.PORT, () => log(`HTTP server listening on port ${process.env.PORT}`));
        this.app.set('server', server);
        server.on('error', (error: Error) => this.app.emit('error', error));
        this.connected = true;
    }

    getEngine(): Express
    {
        return this.app;
    }
}

export const http = new ExpressServer();