import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import controllers from './controllers';
import ErrorHandlingFilter from './filters/ErrorHandlingFilter';

@Module({
    controllers,
    providers: [
        {
            provide: APP_FILTER,
            useClass: ErrorHandlingFilter
        }
    ]
})
export class AppModule { }
