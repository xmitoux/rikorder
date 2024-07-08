import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RikoImagesModule } from './modules/riko_images/riko_images.module';
import { RikoLibraryModule } from './modules/riko-library/riko-library.module';

const pinoHttp = {
  level: process.env.PINO_LOG_LEVEL || 'trace',
  transport: {
    options: {
      singleLine: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
    },
    target: 'pino-pretty',
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({ pinoHttp }),
    RikoImagesModule,
    RikoLibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
