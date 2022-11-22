import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn']
  });
  app.enableCors({ credentials: true, origin: true });
  app.disable(['x-powered-by']);
  app.useStaticAssets(join(__dirname, '..', "uploads"), {
    prefix: '/uploads/'
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, transform: true, transformOptions: {
        enableImplicitConversion: true,
      }
    })
  ).use(cookieParser());
  //Global prefix for API ex: api/v1/users
  // app.setGlobalPrefix('api');
  //Versioning will added globally "v1.0" after "api" prefix
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '0.8'
  // });
  await app.listen(3000);
}
bootstrap();
