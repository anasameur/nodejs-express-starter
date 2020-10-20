const env = require('./env');

function safeLogLevel(logLevel) {
    const level = logLevel === 'warning' ? 'warn' : logLevel;
    return level || 'warn';
}

module.exports = {
    requestFormat: env.production ? 'combined' : 'dev',
    combinedFilenamePath: `../../logs/combined-%DATE%.log`,
    errorFilenamePath: `../../logs/error.log`,
    datePattern: 'YYYY-MM-DD',
    logLevel: safeLogLevel(process.env.LOG_MIN_LEVEL),
};
