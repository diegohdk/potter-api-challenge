/**
 * Adds a message to the log.
 *
 * @param  {...any} args List of arguments to log.
 */
export default function log(...args: any): void
{
    if (process.env.NODE_ENV !== 'test') {
        console.log(`[${new Date().toISOString()}]`, ...args);
    }
}