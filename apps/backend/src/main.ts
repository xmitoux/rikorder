import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  app.useLogger(logger);

  await app.listen(3000, () => {
    logger.log(`Server listening on port:3000 NODE_ENV=${process.env.NODE_ENV}`);
  });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
