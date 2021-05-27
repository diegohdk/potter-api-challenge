/**
 * Context for HTTP requests.
 */
export default class Context
{
    /**
     * Class constructor.
     *
     * @param {any} body Request body.
     * @param {any} params Request path params.
     * @param {any} query Request query string params.
     */
    constructor(
        readonly body?: any,
        readonly params?: any,
        readonly query?: any
    ) { }

    /**
     * Creates a new instance.
     *
     * @param {any} body Request body.
     * @param {any} params Request path params.
     * @param {any} query Request query string params.
     *
     * @returns New instance with the given properties.
     */
    static create(body: any = {}, params?: any, query?: any): Context
    {
        return new Context(body, params, query);
    }
}