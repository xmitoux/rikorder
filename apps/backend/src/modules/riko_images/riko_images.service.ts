import { Injectable } from '@nestjs/common';

import { RikoImage } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';

@Injectable()
export class RikoImagesService {
  constructor(private prisma: PrismaService) {}

  findAll(id?: number): Promise<RikoImage[]> {
    return this.prisma.rikoImage.findMany({
      where: {
        settings: {
          some: {
            rikordModeId: id,
          },
        },
      },
    });
  }

  findFavorites(id?: number): Promise<RikoImage[]> {
    return this.prisma.rikoImage.findMany({
      where: {
        settings: {
          some: {
            rikordModeId: id,
            AND: { isFavorite: true },
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
