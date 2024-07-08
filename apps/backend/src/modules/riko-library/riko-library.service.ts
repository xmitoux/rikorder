import { Injectable } from '@nestjs/common';

import { RikoImage } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';

import { CreateRikoImageSettingDto } from './dto/riko-library.dto';

@Injectable()
export class RikoLibraryService {
  constructor(private prisma: PrismaService) {}

  async createRikoImageWithSettings(file: Express.Multer.File, settings: CreateRikoImageSettingDto[]): Promise<RikoImage> {
    // TODO: 画像アップロード処理
    // const imageUrl = await this.uploadImage(file);
    const imageUrl = 'https://i.idol.st/u/card/art/2x/30Sakurauchi-Riko-Water-Symphony-UR-LpaEgy.png';

    return this.prisma.$transaction(async (prisma) => {
      const rikoImage = await prisma.rikoImage.create({
        data: {
          url: imageUrl,
          uploadedAt: new Date(),
        },
      });

      await prisma.rikoImageSetting.createMany({
        data: settings.map(setting => ({
          rikoImageId: rikoImage.id,
          rikordModeId: setting.rikordModeId,
          isFavorite: setting.isFavorite,
        })),
      });

      return rikoImage;
    });
  }
}
