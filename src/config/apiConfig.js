function getTimeout(envVarName) {
    return Number.parseInt(envVarName || 10000, 10);
}

module.exports = {
    v1: {
        prod: {
            timeout: getTimeout(process.env.API_V1_PROD_TIMEOUT_MS),
        },
        dev: {
            timeout: getTimeout(process.env.API_V1_DEV_TIMEOUT_MS),
        },
    },
};
