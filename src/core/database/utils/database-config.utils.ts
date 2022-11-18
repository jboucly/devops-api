import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { join } from 'path';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { TlsOptions } from 'tls';
import { AdvancedConsoleLogger } from 'typeorm';

import { CustomTypeOrmLogger } from '../../../common/logger/custom-typeorm-logger';

export function GetDatabaseConfig(configService: ConfigService): TypeOrmModuleOptions {
    const connectionOptions: PostgressConnectionStringParser.ConnectionOptions | null = !isNil(
        configService.get('database.databaseUrl')
    )
        ? PostgressConnectionStringParser.parse(configService.get('database.databaseUrl') as string)
        : null;

    let ssl: boolean | TlsOptions | undefined = false;
    const bddSSL = configService.get('database.sslActive') as boolean;

    if (bddSSL) {
        ssl = bddSSL;
    } else if (!isNil(connectionOptions) && !isNil(connectionOptions.ssl)) {
        ssl = connectionOptions.ssl as any;
    }

    return {
        logging: true,
        type: 'postgres',
        synchronize: false,
        ssl: ssl ? { rejectUnauthorized: false } : undefined,
        username: connectionOptions ? connectionOptions.user : 'root',
        password: connectionOptions ? connectionOptions.password : 'root',
        entities: [join(__dirname, '..', '..', '..', '**', '*.entity{.ts,.js}')],
        host: connectionOptions ? (connectionOptions.host as string) : '127.0.0.1',
        port: connectionOptions ? parseInt(connectionOptions.port as string, 10) : 5455,
        logger: new CustomTypeOrmLogger(configService, new AdvancedConsoleLogger('all')),
        database: connectionOptions ? (connectionOptions.database as string) : 'devopsApiDb',
    };
}
