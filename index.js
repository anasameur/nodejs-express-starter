const path = require('path');
require('dotenv-safe').config({
    path: path.resolve(__dirname, `./.env`),
}); // Set all env & conf varibale

const https = require('https');
const fs = require('fs');

const { appConfig, env } = require('./src/config');
const app = require('./src/app');
const { logger } = require('./src/logger');

/**
 * Start the express app
 */

const { name: envName } = env;
const { name: appName, port, host } = appConfig;

const options = {
    pfx: fs.readFileSync('./cert/calculatricedj.engie-cofely.net.pfx'),
    passphrase: 'Cofely!cert09',
};

const server = https.createServer(options, app);

server.listen(port, () => {
    logger.info(`🚀  '${appName}' is running 🚀`);
    logger.info(`🖥️  http://${host}:${port} (${envName})`);
    logger.info(`🖖  Swagger at http://${host}:${port}/api-docs/`);
});

/**
 * Shutdown
 */

function shutdownSuccess() {
    logger.info(`'${appName}' shutdown successful!`);
    process.exit(0);
}

function shutdownError() {
    const message = `'${appName}' did not shutdown properly!`;
    logger.warn(message);
    process.exit(1);
}

function shutdown() {
    // Stops the server from accepting new connections and finishes existing connections.
    logger.info('Closing http server.');
    server.close(async (err) => {
        // if error, log and exit with error (1 code)
        if (err) {
            logger.error('Error shutting down Http server.', err);
            shutdownError();
        }
        logger.info('Http server closed.');
        shutdownSuccess();
    });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('message', (msg) => {
    if (msg === 'shutdown') shutdown();
});
