import CoreError from '../../core/errors/CoreError';
import HttpError from '../errors/HttpError';
import NotFoundError from '../errors/NotFoundError';
import { CastError } from 'mongoose/lib/error/cast';
import { ValidationError } from 'mongoose/lib/error/validation';
import log from './log';

/**
 * Handles signals received by the process, usually to exit the application.
 *
 * @param {string} signal Process signal.
 * @param {boolean} exit Whether to exit the application or not.
 * @param {Error} error Error instance.
 */
export default function die(signal: string, exit: boolean, error?: Error): void
{
    log('Process received the signal', signal);

    if (error) {
        log(error.stack);
    }

    if (exit) {
        doExit();
    }
}

export interface ErrorDetails
{
    errorResponse: any
    status: number
    logMessage: string
}

export function handleError(error: any): ErrorDetails
{
    const errorResponse: any = {};
    let logMessage: string = error.stack;
    let status: number = 500;

    if (error instanceof NotFoundError) {
        errorResponse.error = 'The resource you are looking for does not exist';
        status = 404;
        logMessage = null;
    } else if (error instanceof ValidationError) {
        errorResponse.error = 'The request data is invalid';
        errorResponse.details = {};
        status = 422;
        logMessage = null;
        Object.entries(error.errors).map((entry: any[]) => errorResponse.details[entry[0]] = entry[1].message);
    } else if (error instanceof CastError) {
        errorResponse.error = `The provied value for ${error.path} is invalid`;
        status = 422;
        logMessage = null;
    } else if (error instanceof CoreError) {
        errorResponse.error = error.message;
        status = error.code;
        logMessage = null;
    } else if (error instanceof HttpError) {
        errorResponse.error = 'Sorry, we could not process your request';
    } else {
        errorResponse.error = 'Ops! Something went wrong here';
    }

    return {
        errorResponse,
        status,
        logMessage
    }
}

/**
 * Exit the aplication.
 */
function doExit()
{
    log('Bye!');
    process.exit();
}
