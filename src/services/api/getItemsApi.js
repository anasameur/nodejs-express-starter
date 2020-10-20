const Client = require('./client');
const { logger } = require('../../logger');
const serviceConfig = require('../../config').servicesConfig;

const { DEFAULT_PAGINATION_LIMIT } = serviceConfig;

const fetchData = async function (url, type, query) {
    const authorisationHeaders = serviceConfig[type];
    const queryParams = query || {};
    queryParams.limit = DEFAULT_PAGINATION_LIMIT;
    const response = await Client.get(url, {
        headers: authorisationHeaders,
        params: queryParams,
    });
    logger.debug(`fetch data success`);
    return response.data;
};

module.exports = { fetchData };
