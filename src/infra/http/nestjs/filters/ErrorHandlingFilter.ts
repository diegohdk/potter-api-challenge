import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { handleError } from '../../../../common/utils/errors';
import log from '../../../../common/utils/log';
import CoreError from '../../../../core/errors/CoreError';

@Catch()
export default class ErrorHandlingFilter implements ExceptionFilter
{
    catch(exception: unknown, host: ArgumentsHost): void
    {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        if (exception instanceof HttpException) {
            exception = new CoreError(exception.message, exception.getStatus());
        }

        const { status, errorResponse, logMessage } = handleError(exception);

        if (logMessage) {
            const uri = `${req.method} ${req.protocol}://${req.headers.host}${req.url}`;
            log(uri, logMessage);
        }

        res.status(status).json(errorResponse);
    }
}
