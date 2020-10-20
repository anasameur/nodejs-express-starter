const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const { logger } = require('../logger');
const apiV1 = require('../api/v1');
const error = require('../api/middleware/error');
const { logConfig } = require('../config');

/**
 * Express instance
 * @public
 */
const app = express();

// request logging
app.use(morgan(logConfig.requestFormat, { stream: logger.stream }));

// parse request body as JSON by default
app.use(express.json());

// gzip compression
if (process.env.GZIP === 'true') app.use(compress());

// secure api by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
if (process.env.CORS === 'true') app.use(cors());

// Serve public files, such as images for HTML rendering
app.use(express.static('public'));

// mount api v1
app.use('/api/v1/', apiV1);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
