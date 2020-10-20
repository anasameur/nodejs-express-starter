/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { logger } = require('../../logger');
const { env } = require('../../config');

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
    const err = new Error();
    err.status = httpStatus.NOT_FOUND;
    err.message = '404 NOT FOUND';
    logger.warn(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
    next(err);
};

/**
 * Error handler
 * @public
 */
const handler = (err, req, res, next) => {
    // eslint-disable-next-line no-param-reassign
    if (!err.status) err.status = httpStatus.INTERNAL_SERVER_ERROR; // Sets a generic server error status code if none is part of the err

    // eslint-disable-next-line no-param-reassign
    err.message = `${httpStatus[err.status]} - ${err.message}`; // Set the message for the appropriate status. Keep previous message in dev.

    const response = {
        code: err.status,
        message: err.message,
        errors: err.errors,
        stack: err.stack,
    };
    if (err.status >= httpStatus.INTERNAL_SERVER_ERROR) logger.error(err); // Log server errors, before manipulating the error message
    if (env.development) {
        // Log all server errors in dev mode
        logger.error(err);
    }
    if (!env.development) {
        // delete stack trace for prod mode from the response
        delete response.stack;
    }
    res.status(err.status);
    res.json(response);
};
exports.handler = handler;
