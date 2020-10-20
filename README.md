# form-renderer

## Build and launch

-   Run `npm install` to install dependencies
-   Run `ln -s .env.example .env` (Use `.env.example` as your environment variables by creating a symbolic link)
-   Run `npm run start` to start the server in Production mode, `npm run dev` for development mode (at http://localhost:3000, including
    auto-reload server on file change)`

## Build on Windows

-   Run `npm install --build-from-resource` to install dependencies

## Run the app in production

-   If not already done, install `pm2`: `npm install pm2 -g`
-   Start the app, with up to 2 instances: `pm2 start . -i 2 --name Excel-renderer`
-   Stop the app: `pm2 stop Excel-renderer`
-   Stop & Start : `pm2 restart Excel-renderer`
-   Monitor the app: `pm2 monit` and/or `pm2 imonit`
