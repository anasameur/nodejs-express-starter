const production = process.env.NODE_ENV === 'production';

module.exports = {
    production,
    development: !production,
    name: process.env.ENV_NAME,
};
