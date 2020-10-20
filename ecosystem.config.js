const { name, main } = require('./package.json');

// pm2 configuration
module.exports = {
    apps: [
        {
            name,
            script: main,
            wait_ready: true,
            exp_backoff_restart_delay: 100, // ms between restart, will increase exponentially if can't restart
            listen_timeout: 1000 * 5, // ms before the app is considered ready by pm2
            kill_timeout: 1000 * 5, // ms before pm2 kills the app if it does not shutdown
            error_file: 'log/error/err.log',
            out_file: 'log/out/out.log',
            log_file: 'log/combined/combined.log',
            log_date_format: 'YYYY-MM-DD HH:mm',
            time: true,
        },
    ],
};
