import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { INestApplication } from '@nestjs/common';
import { default as HttpServer } from '../../Server';

export default class NestJSServer extends HttpServer
{
    private app: INestApplication;

    async initialize(): Promise<void>
    {
        this.app = await NestFactory.create(AppModule);
    }

    async connect(): Promise<void>
    {
        if (this.connected) {
            return;
        }

        await this.initialize();
        await this.app.listen(3000);
        this.connected = true;
    }

    getEngine(): any
    {
        return this.app.getHttpServer();
    }
}

export const http = new NestJSServer();