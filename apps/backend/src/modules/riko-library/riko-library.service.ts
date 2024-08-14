import { Injectable, Logger } from '@nestjs/common';

import { RikoImage, RikoImageSettingEntity } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';
import { SupabaseService } from '~/common/services/supabase.service';

import { CreateRikoImageSettingDto, UpsertRikoImageSettingsDto } from './dto/riko-library.dto';
import { RikoImageDetailsEntity, YearChartDataEntity } from './entities/riko-library.entity';

@Injectable()
export class RikoLibraryService {
  private readonly logger = new Logger(RikoLibraryService.name);

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
      .getStorage()
      .upload(`${Date.now()}_${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      throw new Error(`Supabase Storage アップロード失敗: ${uploadError.message}`);
    }

    // アップロードしたパスからURLを取得
    const { data: urlData } = this.supabaseService
      .getStorage()
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

  async getRikoImageDetails(rikoImageId: number): Promise<RikoImageDetailsEntity> {
    const detailsResult = await this.prisma.rikord.groupBy({
      by: ['rikoImageId', 'rikordModeId'],
      where: {
        rikoImageId,
      },
      _count: {
        id: true,
      },
      _sum: {
        duration: true,
      },
    });

    const currentYear = new Date().getFullYear();
    const startYear = 2024;

    // 年別データ集計
    const yearChartData = await this.prisma.$queryRaw<(YearChartDataEntity & { rikord_mode_id: number })[]>`
      SELECT 
        rikord_mode_id,
        EXTRACT(YEAR FROM started_at)::int AS year,
        SUM(duration)::int AS duration,
        COUNT(*)::int AS count
      FROM rikords
      WHERE
        riko_image_id = ${rikoImageId}
        AND EXTRACT(YEAR FROM started_at) BETWEEN ${startYear} AND ${currentYear}
      GROUP BY
        EXTRACT(YEAR FROM started_at),
        rikord_mode_id
      ORDER BY year DESC
    `;

    return {
      rikoImage: await this.prisma.rikoImage.findUniqueOrThrow({ where: { id: rikoImageId } }),
      details: detailsResult.map((detail) => {
        // モードごとの年別データをくっつける
        const yearChartDataByMode = yearChartData
          .filter(data => data.rikord_mode_id === detail.rikordModeId)
          .map(({ rikord_mode_id, ...data }) => data);

        return {
          rikordModeId: detail.rikordModeId,
          count: detail._count.id ?? 0,
          duration: detail._sum.duration ?? 0,
          yearDataList: yearChartDataByMode,
        };
      }),
    };
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

  async deleteRikoImage(rikoImageId: number): Promise<void> {
    this.prisma.$transaction(async (tx) => {
      const deletedImage = await tx.rikoImage.delete({
        where: {
          id: rikoImageId,
        },
      });

      const deleteImagePath = this.extractSupabaseStoragePathFromUrl(deletedImage.url);

      const { data, error } = await this.supabaseService
        .getStorage()
        .remove([deleteImagePath]);

      if (error) {
        this.logger.error('うわっ！画像の削除で問題発生😱', error);
        throw error;
      }

      this.logger.log('やったー！画像削除成功🎉', data);
    });
  }

  /**
   * Supabase storageの画像URLからファイルパスを抽出する
   * @param url Supabase storageの画像URL
   * @returns ファイルパス
   */
  private extractSupabaseStoragePathFromUrl(url: string): string {
    const urlObj = new URL(url);
    // 最後のスラッシュ以降の部分（ファイル名）だけを取得
    return urlObj.pathname.split('/').pop() || '';
  }
}
