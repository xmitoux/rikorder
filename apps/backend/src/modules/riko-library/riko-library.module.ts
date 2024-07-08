import { Module } from '@nestjs/common';

import { PrismaService } from '~/common/services/prisma.service';

import { RikoLibraryController } from './riko-library.controller';
import { RikoLibraryService } from './riko-library.service';

@Module({
  controllers: [RikoLibraryController],
  providers: [PrismaService, RikoLibraryService],
})
export class RikoLibraryModule {}
