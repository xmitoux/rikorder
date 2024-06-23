import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RikoImagesService } from './riko_images.service';
import { CreateRikoImageDto } from './dto/create-riko_image.dto';
import { UpdateRikoImageDto } from './dto/update-riko_image.dto';

@Controller('riko-images')
export class RikoImagesController {
  constructor(private readonly rikoImagesService: RikoImagesService) {}

  @Post()
  create(@Body() createRikoImageDto: CreateRikoImageDto) {
    return this.rikoImagesService.create(createRikoImageDto);
  }

  @Get()
  findAll() {
    return this.rikoImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rikoImagesService.findOne(+id);
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
