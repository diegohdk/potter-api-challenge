/**
 * Adds a message to the log.
 *
 * @param  {...any} args List of arguments to log.
 */
export default function log(...args: any)
{
    if (process.env.NODE_ENV !== 'test') {
        console.log(`[${new Date().toISOString()}]`, ...args);
    }
}