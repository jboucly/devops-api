import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => ({
    sslActive: process.env.BDD_SSL === 'true',
    databaseUrl: process.env.DATABASE_URL || null,
    logging: process.env.ORM_LOGGER_ENABLED === 'true',
    migrations: [join(__dirname, '..', 'migrations', '*.ts')],
    entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
}));
