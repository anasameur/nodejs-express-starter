const path = require('path');
const winston = require('winston');
const { logConfig } = require('../config');

require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
    filename: path.resolve(__dirname, logConfig.combinedFilenamePath),
    datePattern: logConfig.datePattern,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const myFormat = winston.format.printf((info) => {
    return `[${new Date().toLocaleString()}] [${info.level}] : ${info.message} ${info.stack ? `\n ${info.stack}` : ''}`;
});

const logger = winston.createLogger({
    level: logConfig.logLevel,
    format: myFormat,
    transports: [
        new winston.transports.File({
            filename: path.resolve(__dirname, logConfig.errorFilenamePath),
            level: 'error',
        }),
        transport,
    ],
});

logger.stream = {
    write: (message) => logger.info(message),
};

module.exports = {
    logger,
};
