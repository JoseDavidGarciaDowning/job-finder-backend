import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`🚀 Server running on port ${process.env.PORT}`);
}
bootstrap();
