import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { IdParam } from '~/common/dto/id-param';

import { CreateRikoImageWithSettingsDto } from './dto/riko-library.dto';
import { RikoImageEntity, RikoImageSettingEntity } from './entities/riko-library.entity';
import { RikoLibraryService } from './riko-library.service';

@Controller('/api/riko-library')
export class RikoLibraryController {
  constructor(private readonly rikoLibraryService: RikoLibraryService) {}

  @Post('riko-images')
  @UseInterceptors(FileInterceptor('file'))
  async createRikoImageWithSettings(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRikoImageWithSettingsDto: CreateRikoImageWithSettingsDto,
  ): Promise<RikoImageEntity> {
    return new RikoImageEntity(await this.rikoLibraryService.createRikoImageWithSettings(file, createRikoImageWithSettingsDto.settings));
  }

  @Get('/:id')
  async findByRikoImageId(@Param() { id: rikoImageId }: IdParam): Promise<RikoImageSettingEntity[]> {
    const rikoImageSettings = await this.rikoLibraryService.findByRikoImageId(rikoImageId);
    return rikoImageSettings.map(data => new RikoImageSettingEntity(data));
  }
}
