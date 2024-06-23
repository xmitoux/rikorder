import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { IdParam } from '~/common/dto/id-param';

import { RikoImageCreateDto } from './dto/riko_image.dto';
import { UpdateRikoImageDto } from './dto/update-riko_image.dto';
import { RikoImageEntity } from './entities/riko_image.entity';
import { RikoImagesService } from './riko_images.service';

@Controller('/api/riko-images')
export class RikoImagesController {
  constructor(private readonly rikoImagesService: RikoImagesService) {}

  @Post()
  async create(@Body() createRikoImageDto: RikoImageCreateDto): Promise<RikoImageEntity> {
    return new RikoImageEntity(await this.rikoImagesService.create(createRikoImageDto));
  }

  @Get()
  async findAll(): Promise<RikoImageEntity[]> {
    const rikoImages = await this.rikoImagesService.findAll();

    return rikoImages.map(data => new RikoImageEntity(data));
  }

  @Get(':id')
  async findOne(@Param() { id }: IdParam): Promise<RikoImageEntity> {
    return new RikoImageEntity(await this.rikoImagesService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRikoImageDto: UpdateRikoImageDto) {
    return this.rikoImagesService.update(+id, updateRikoImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rikoImagesService.remove(+id);
  }
}
