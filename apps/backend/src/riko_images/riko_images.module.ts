import { Module } from '@nestjs/common';
import { RikoImagesService } from './riko_images.service';
import { RikoImagesController } from './riko_images.controller';

@Module({
  controllers: [RikoImagesController],
  providers: [RikoImagesService],
})
export class RikoImagesModule {}
