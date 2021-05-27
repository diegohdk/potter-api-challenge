/**
 * Core error class.
 */
export default class CoreError extends Error
{
    public readonly code: number = 400

    constructor(message?: string, code?: number)
    {
        super(message)

        if (code) {
            this.code = code;
        }
    }
}