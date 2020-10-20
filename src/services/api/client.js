const axios = require('axios');
const httpStatus = require('http-status');
const HttpsProxyAgent = require('https-proxy-agent');
const serviceConfig = require('../../config').servicesConfig;
const { logger } = require('../../logger');
const { env } = require('../../config');

const agent = new HttpsProxyAgent('http://proxy.cofely-fr.gdfsuez.net:8080');

const client = axios.create({
    timeout: 2000,
    baseURL: serviceConfig.BASE_URL,
    json: true,
    httpsAgent: agent,
});

client.interceptors.request.use((request) => {
    logger.info(`Request to server ${request.baseURL}${request.url}`);
    logger.debug(`Request headers ${JSON.stringify(request.headers)}`);
    logger.debug(`Request query params ${JSON.stringify(request.params)}`);
    return request;
});

client.interceptors.response.use(
    (response) => {
        logger.debug(`Response status ${response.status}`);
        logger.debug(`Response data ${JSON.stringify(response.data)}`);
        return response;
    },
    (error) => {
        if (env.development) {
            // Log all server errors in dev mode
            logger.error(error);
        }
        if (error.config && error.response) {
            logger.error(`Request to server ${error.config.url} failed with status code ${error.response.status}`);
        }
        const err = new Error();
        err.status = httpStatus.INTERNAL_SERVER_ERROR;
        err.message = `internal api call failed`;
        throw err;
    }
);

module.exports = client;
