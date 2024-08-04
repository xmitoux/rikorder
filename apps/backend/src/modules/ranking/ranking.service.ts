import { Injectable } from '@nestjs/common';

import { PrismaService } from '~/common/services/prisma.service';
import { RikoImageEntity } from '~/modules/riko-library/entities/riko-library.entity';
import { dateUtils } from '~/utils/dateUtils';

import { GetRankingDto } from './dto/ranking.dto';

export type RankingResult = {
  rikoImage: RikoImageEntity;
  count: number;
  duration: number;
};

@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) {}

  async getRanking(dto: GetRankingDto): Promise<RankingResult[]> {
    const { rikordModeId, year, month } = dto;

    // 集計期間
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (year && month) {
      // 年月指定
      const { startDateOfMonth, endDateOfMonth } = dateUtils.getStartAndEndDateOfMonth(new Date(year, month - 1));
      startDate = startDateOfMonth;
      endDate = endDateOfMonth;
    }
    else if (year) {
      // 年指定
      const { startDateOfYear, endDateOfYear } = dateUtils.getStartAndEndDateOfYear(year);
      startDate = startDateOfYear;
      endDate = endDateOfYear;
    }

    const rankingResult = await this.prisma.rikord.groupBy({
      by: 'rikoImageId',
      where: {
        rikordModeId,
        startedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        duration: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    // 集計した画像IDのリレーションを取得する
    const rankingRikoImageIds = rankingResult.map(ranking => ranking.rikoImageId);
    const rankingRikoImages = await this.prisma.rikoImage.findMany({
      where: {
        id: {
          in: rankingRikoImageIds,
        },
      },
    });

    return rankingResult.map((ranking) => {
      return {
        rikoImage: rankingRikoImages.find(image => image.id === ranking.rikoImageId)!,
        count: ranking._count.id ?? 0,
        duration: ranking._sum.duration ?? 0,
      };
    });
  }
}
