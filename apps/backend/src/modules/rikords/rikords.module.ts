import { Module } from '@nestjs/common';

import { PrismaService } from '~/common/services/prisma.service';

import { RikordsController } from './rikords.controller';
import { RikordsService } from './rikords.service';

@Module({
  controllers: [RikordsController],
  providers: [PrismaService, RikordsService],
})
export class RikordsModule {}
