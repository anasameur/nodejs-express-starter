const { name, version } = require('../../package.json');

module.exports = {
    name,
    version,
    commit: '{COMMIT-HASH}', // placeholder
    host: process.env.HOST_NAME,
    port: Number.parseInt(process.env.PORT, 10),
};
