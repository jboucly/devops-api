/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */

const path_1 = require('path');
const lodash = require('lodash');
const PostgressConnectionStringParser = require('pg-connection-string');

const useConnectionsOptions = process.env.BACK_ACCESS_DATABASE_URL ? true : false;
const connectionOptions = useConnectionsOptions
    ? PostgressConnectionStringParser.parse(process.env.BACK_ACCESS_DATABASE_URL)
    : null;

let ssl = false;

if (process.env.BDD_SSL) {
    ssl = process.env.BDD_SSL === 'true';
} else if (!lodash.isNil(connectionOptions) && !lodash.isNil(connectionOptions.ssl)) {
    ssl = connectionOptions.ssl;
}

module.exports = {
    type: 'postgres',
    cli: { migrationsDir: 'migrations' },
    migrationsTableName: 'orm_migrations',
    ssl: ssl ? { rejectUnauthorized: false } : undefined,
    port: useConnectionsOptions ? connectionOptions.port : 5455,
    entities: [path_1.join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [path_1.join(__dirname, '../migrations/*{.ts,.js}')],
    username: useConnectionsOptions ? connectionOptions.user : 'root',
    host: useConnectionsOptions ? connectionOptions.host : '127.0.0.1',
    password: useConnectionsOptions ? connectionOptions.password : 'root',
    database: useConnectionsOptions ? connectionOptions.database : 'devopsApiDb',
};
