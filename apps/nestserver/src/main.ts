import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({exposedHeaders: '*'});

  app.useStaticAssets(join(__dirname, '..', '../../dist/apps/tarcza'));

  const port = process.env.port || 3333;

  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
