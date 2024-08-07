import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { IdParam } from '~/common/dto/id-param';

import { CreateRikordDto, SearchRikordsDto, UpdateRikordDto } from './dto/rikord.dto';
import { RikordEntity, RikordInfoEntity } from './entities/rikord.entity';
import { RikordsService } from './rikords.service';

@Controller('/api/rikords')
export class RikordsController {
  constructor(private readonly rikordsService: RikordsService) {}

  @Post()
  async create(@Body() createRikordDto: CreateRikordDto): Promise<RikordEntity> {
    return new RikordEntity(await this.rikordsService.create(createRikordDto));
  }

  @Post('search')
  @HttpCode(HttpStatus.OK) // POSTだと201になるので200にする
  async searchRikords(@Body() searchDto: SearchRikordsDto): Promise<RikordEntity[]> {
    const rikords = await this.rikordsService.searchRikords(searchDto);
    return rikords.map(data => new RikordEntity(data));
  }

  @Get('info/:id')
  async getRikordInfo(@Param() { id: rikordModeId }: IdParam): Promise<RikordInfoEntity> {
    return new RikordInfoEntity(await this.rikordsService.getRikordInfo(rikordModeId));
  }

  @Patch()
  async updateRikord(@Body() dto: UpdateRikordDto): Promise<RikordEntity> {
    return new RikordEntity(await this.rikordsService.updateRikord(dto));
  }

  @Delete('/:id')
  async deleteRikoImage(@Param() { id }: IdParam) {
    return this.rikordsService.deleteRikord(id);
  }
}
