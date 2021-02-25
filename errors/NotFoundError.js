'use strict';

const HttpError = require('./HttpError');

/**
 * Class for not found errors.
 */
class NotFoundError extends HttpError { }

module.exports = NotFoundError;