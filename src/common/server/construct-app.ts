import { CustomNestLogger } from '@common/logger/custom-nest-logger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { DocumentBuilder, OpenAPIObject, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from 'src/app.module';

export const ConstructApp = async (): Promise<{
    app: INestApplication;
    configService: ConfigService;
    document: OpenAPIObject | undefined;
}> => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    app.use(helmet());
    app.useLogger(new CustomNestLogger(configService));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );
    app.enableCors({
        origin: configService.get('http.cors') as string,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'X-App-Platform',
            'X-App-Version-Code',
            'X-App-Version-Number',
            'X-Auth-Secret',
        ],
        maxAge: 1000,
    });

    let document: OpenAPIObject | undefined = undefined;

    if (configService.get('logs.swagger')) {
        const configs = new DocumentBuilder()
            .setTitle('DevOps Dashboard API')
            .setDescription('API reserved for DevOps Dashboard')
            .setVersion(configService.get('commons.version') as string)
            .addBearerAuth(
                {
                    type: 'http',
                    in: 'header',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: 'Authorization',
                },
                'bearer'
            )
            .build();

        const options: SwaggerDocumentOptions = {
            operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
        };
        document = SwaggerModule.createDocument(app, configs, options);
        SwaggerModule.setup('docs', app, document);
    }

    return {
        app,
        document,
        configService,
    };
};
