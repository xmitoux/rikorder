import { Body, Controller, Post } from '@nestjs/common';

import { CreateRikordDto } from './dto/rikord.dto';
import { RikordEntity } from './entities/rikord.entity';
import { RikordsService } from './rikords.service';

@Controller('/api/rikords')
export class RikordsController {
  constructor(private readonly rikordsService: RikordsService) {}

  @Post()
  async create(@Body() createRikordDto: CreateRikordDto): Promise<RikordEntity> {
    return new RikordEntity(await this.rikordsService.create(createRikordDto));
  }
}
