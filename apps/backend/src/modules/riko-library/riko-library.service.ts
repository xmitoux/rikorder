import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RikoImage, RikoImageSettingEntity } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';
import { SupabaseService } from '~/common/services/supabase.service';

import { CreateRikoImageSettingDto, UpsertRikoImageSettingsDto } from './dto/riko-library.dto';

@Injectable()
export class RikoLibraryService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
    private configService: ConfigService,
  ) {}

  async createRikoImageWithSettings(file: Express.Multer.File, settings: CreateRikoImageSettingDto[]): Promise<RikoImage> {
    const supabaseStorage = this.configService.get<string>('SUPABASE_STORAGE');
    if (!supabaseStorage) {
      throw new Error('Supabase用の環境変数が設定されていません。'
        + '<SUPABASE_STORAGE>を確認してください。');
    }

    const imageUrl = await this.uploadImage(supabaseStorage, file);

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

  async uploadImage(supabaseStorage: string, file: Express.Multer.File): Promise<string> {
    // アップロード処理
    const { data: pathData, error: uploadError } = await this.supabaseService
      .getClient()
      .storage.from(supabaseStorage)
      .upload(`${Date.now()}_${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      throw new Error(`Supabase Storage アップロード失敗: ${uploadError.message}`);
    }

    // アップロードしたパスからURLを取得
    const { data: urlData } = this.supabaseService
      .getClient()
      .storage.from(supabaseStorage)
      .getPublicUrl(pathData.path);

    return urlData.publicUrl;
  }

  findByRikoImageId(id: number): Promise<RikoImageSettingEntity[]> {
    return this.prisma.rikoImageSetting.findMany({
      where: {
        rikoImageId: id,
      },
    });
  }

  async upsert({ settings }: UpsertRikoImageSettingsDto) {
    // 受け取ったモード
    const receivedRikordModeId = settings.map(setting => setting.rikordModeId);

    return this.prisma.$transaction(async (tx) => {
      // 受け取ったモードをupsert
      const upsertPromises = settings.map(({ rikoImageId, rikordModeId, isFavorite }) =>
        tx.rikoImageSetting.upsert({
          where: {
            rikoImageId_rikordModeId: {
              rikoImageId,
              rikordModeId,
            },
          },
          create: {
            rikoImageId,
            rikordModeId,
            isFavorite,
          },
          update: {
            isFavorite,
          },
        }));

      // 受け取らなかったモードは削除
      const deletePromise = tx.rikoImageSetting.deleteMany({
        where: {
          rikoImageId: settings[0].rikoImageId,
          rikordModeId: {
            notIn: receivedRikordModeId,
          },
        },
      });

      // 全ての処理を並列で実行
      await Promise.all([...upsertPromises, deletePromise]);
    });
  }
}
