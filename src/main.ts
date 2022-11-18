import { ConstructApp } from '@common/server/construct-app';

async function bootstrap() {
   const { app, configService } = await ConstructApp();
    await app.listen(configService.get('http.port'));
}

bootstrap();
