import { Module } from '@nestjs/common';

import { PrismaService } from '~/common/services/prisma.service';
import { SupabaseService } from '~/common/services/supabase.service';

import { RikoLibraryController } from './riko-library.controller';
import { RikoLibraryService } from './riko-library.service';

@Module({
  controllers: [RikoLibraryController],
  providers: [PrismaService, SupabaseService, RikoLibraryService],
})
export class RikoLibraryModule {}
