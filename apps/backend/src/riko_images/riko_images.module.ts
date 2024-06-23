import { Module } from '@nestjs/common';

import { PrismaService } from '~/common/services/prisma.service';

import { RikoImagesController } from './riko_images.controller';
import { RikoImagesService } from './riko_images.service';

@Module({
  controllers: [RikoImagesController],
  providers: [PrismaService, RikoImagesService],
})
export class RikoImagesModule {}
