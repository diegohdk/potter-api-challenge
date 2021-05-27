import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { INestApplication } from '@nestjs/common';
import HttpServer from '../HttpServer';

export default class NestJSServer extends HttpServer
{
    private app: INestApplication;

    async initialize(): Promise<void>
    {
        this.app = await NestFactory.create(AppModule);
    }

    async connect(): Promise<void>
    {
        await this.initialize();
        await this.app.listen(3000);
    }

    getEngine(): any
    {
        return this.app.getHttpServer();
    }
}