import InvalidEntityError from '../../errors/InvalidEntityError';

/**
 * Class for errors of invalid house.
 */
export default class InvalidHouseError extends InvalidEntityError
{
    constructor(message?: string, code: number = 422)
    {
        super(message, code);
    }
}