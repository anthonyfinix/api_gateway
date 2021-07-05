// imports
import express, { Application, Router } from 'express';
import router from './routes';
import configuration, { IConfig } from './config';
import headers from './middleware/headers';
import handleUser from './middleware/handleUser';
export default async (options: IConfig): Promise<Application> => {
    configuration.setConfiguration(options);
    const app: Application = express();
    app.use(headers);
    app.use(handleUser);
    app.use(router);
    return app;
}

