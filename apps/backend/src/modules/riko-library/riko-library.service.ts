import { Injectable } from '@nestjs/common';

import { RikoImage } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';
import { SupabaseService } from '~/common/services/supabase.service';

import { CreateRikoImageSettingDto } from './dto/riko-library.dto';

@Injectable()
export class RikoLibraryService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async createRikoImageWithSettings(file: Express.Multer.File, settings: CreateRikoImageSettingDto[]): Promise<RikoImage> {
    const imageUrl = await this.uploadImage(file);

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

  async uploadImage(file: Express.Multer.File): Promise<string> {
    // アップロード処理
    const { data: pathData, error: uploadError } = await this.supabaseService
      .getClient()
      .storage.from('riko-images')
      .upload(`${Date.now()}_${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // アップロードしたパスからURLを取得
    const { data: urlData } = this.supabaseService
      .getClient()
      .storage.from('riko-images')
      .getPublicUrl(pathData.path);

    return urlData.publicUrl;
  }
}
