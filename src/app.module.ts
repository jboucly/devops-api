import { config } from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { EntitiesModule } from './entities/entities.module';

@Module({
    imports: [
        /**  LIBS MODULES  **/
        ConfigModule.forRoot({
            cache: true,
            load: config,
            isGlobal: true,
        }),

        /**  CORE MODULES  **/
        CoreModule,
        EntitiesModule,
    ],
})
export class AppModule {}
