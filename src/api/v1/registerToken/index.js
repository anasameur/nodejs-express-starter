const { env } = require('../../../config');
const apiConfig = env.production ? require('../../../config').apiConfig.v1.prod : require('../../../config').apiConfig.v1.dev;

const DEFAULT_CHARSET = 'charset=utf-8';
const MIME_TYPES_CHARSET = {
    TEXT: `text/plain; ${DEFAULT_CHARSET}`,
};

module.exports = async function (req, res, next) {
    req.setTimeout(apiConfig.timeout);
    try {
        const responseType = MIME_TYPES_CHARSET.TEXT;
        res.type(responseType);
        res.send('response');
        return;
    } catch (e) {
        // if Error occured push the error to the global error handler middleware
        next(e);
    }
};
