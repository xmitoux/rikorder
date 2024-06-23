import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  app.useLogger(logger);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000, () => {
    logger.log(`Server listening on port:3000 NODE_ENV=${process.env.NODE_ENV}`);
  });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
