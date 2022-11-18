import authConfig from './auth.config';
import commonsConfig from './commons.config';
import databaseConfig from './database.config';
import httpConfig from './http.config';
import logsConfig from './logs.config';

export const config = [
    logsConfig,
    authConfig,
    httpConfig,
    commonsConfig,
    databaseConfig,
];
