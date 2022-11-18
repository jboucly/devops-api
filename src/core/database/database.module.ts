import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetDatabaseConfig } from './utils/database-config.utils';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: GetDatabaseConfig,
        }),
    ],
})
export class DatabaseModule {}
