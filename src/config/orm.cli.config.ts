import { isNil } from 'lodash';
import { join } from 'path';
import * as PostgressConnectionStringParser from 'pg-connection-string';

const useConnectionsOptions = process.env.BACK_ACCESS_DATABASE_URL ? true : false;
const connectionOptions = useConnectionsOptions
    ? PostgressConnectionStringParser.parse(process.env.BACK_ACCESS_DATABASE_URL as string)
    : null;

let ssl = false;

if (process.env.BDD_SSL) {
    ssl = process.env.BDD_SSL === 'true';
} else if (!isNil(connectionOptions) && !isNil(connectionOptions.ssl)) {
    ssl = connectionOptions.ssl as boolean;
}

module.exports = {
    type: 'postgres',
    migrationsTableName: 'orm_migrations',
    cli: { migrationsDir: 'src/migrations' },
    ssl: ssl ? { rejectUnauthorized: false } : null,
    entities: [join('src', '**', '*.entity{.ts,.js}')],
    migrations: [join('src', 'migrations', '*{.ts,.js}')],
    port: connectionOptions ? connectionOptions.port : 5455,
    username: connectionOptions ? connectionOptions.user : 'root',
    host: connectionOptions ? connectionOptions.host : '127.0.0.1',
    password: connectionOptions ? connectionOptions.password : 'root',
    database: connectionOptions ? connectionOptions.database : 'devopsApiDb',
};
