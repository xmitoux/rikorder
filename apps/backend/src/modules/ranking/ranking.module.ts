import { Module } from '@nestjs/common';

import { PrismaService } from '~/common/services/prisma.service';

import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';

@Module({
  controllers: [RankingController],
  providers: [PrismaService, RankingService],
})
export class RankingModule {}
