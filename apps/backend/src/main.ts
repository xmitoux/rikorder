import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import * as express from 'express';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000, () => {
    logger.log(`Server listening on port:3000 NODE_ENV=${process.env.NODE_ENV}`);
  });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
