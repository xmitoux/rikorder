import { Controller, Get, Param } from '@nestjs/common';

import { IdParam } from '~/common/dto/id-param';

import { RikoImageEntity } from './entities/riko_image.entity';
import { RikoImagesService } from './riko_images.service';

@Controller('/api/riko-images')
export class RikoImagesController {
  constructor(private readonly rikoImagesService: RikoImagesService) {}
  @Get()
  async findAll(): Promise<RikoImageEntity[]> {
    const rikoImages = await this.rikoImagesService.findAll();

    return rikoImages.map(data => new RikoImageEntity(data));
  }

  @Get('/find-by-rikord-mode/:id')
  async findByRikordModeId(@Param() { id: rikordModeId }: IdParam): Promise<RikoImageEntity[]> {
    const rikoImages = await this.rikoImagesService.findAll(rikordModeId);

    return rikoImages.map(data => new RikoImageEntity(data));
  }

  @Get('/find-favorites/:id')
  async findFavorites(@Param() { id: rikordModeId }: IdParam): Promise<RikoImageEntity[]> {
    const rikoImages = await this.rikoImagesService.findFavorites(rikordModeId);

    return rikoImages.map(data => new RikoImageEntity(data));
  }
}
