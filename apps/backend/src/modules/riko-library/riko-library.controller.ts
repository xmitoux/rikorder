import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { CreateRikoImageWithSettingsDto } from './dto/riko-library.dto';
import { RikoImageEntity } from './entities/riko-library.entity';
import { RikoLibraryService } from './riko-library.service';

@Controller('/api/riko-library')
export class RikoLibraryController {
  constructor(private readonly rikoImagesService: RikoLibraryService) {}

  @Post('riko-images')
  @UseInterceptors(FileInterceptor('file'))
  async createRikoImageWithSettings(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRikoImageWithSettingsDto: CreateRikoImageWithSettingsDto,
  ): Promise<RikoImageEntity> {
    return new RikoImageEntity(await this.rikoImagesService.createRikoImageWithSettings(file, createRikoImageWithSettingsDto.settings));
  }
}
