'use strict';

/**
 * Adds a message to the log.
 *
 * @param  {...any} args List of arguments to log.
 */
function log(...args)
{
    if (process.env.NODE_ENV !== 'test') {
        console.log(`[${new Date().toISOString()}]`, ...args);
    }
}

module.exports = log;