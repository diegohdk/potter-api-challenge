'use strict';

const log = require('./log');

/**
 * Handles signals received by the process, usually to exit the application.
 *
 * @param {String} signal Process signal.
 * @param {Boolean} exit Whether to exit the application or not.
 * @param {Error} error Error instance.
 */
function die(signal, exit, error)
{
    log('Process received the signal', signal);

    if(error)
        log(error.stack);

    if(exit)
        doExit();
}

/**
 * Exit the aplication.
 */
function doExit()
{
    log('Bye!');
    process.exit();
}

module.exports = die;