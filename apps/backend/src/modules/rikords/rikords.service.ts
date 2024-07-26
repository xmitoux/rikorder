import { Injectable } from '@nestjs/common';

import { Rikord } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';

import { CreateRikordDto, SearchRikordsDto } from './dto/rikord.dto';

@Injectable()
export class RikordsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRikordDto): Promise<Rikord> {
    const duration = this.calculateDurationInSeconds(data.startedAt, data.finishedAt);

    return this.prisma.rikord.create({
      data: { ...data, duration },
    });
  }

  /**
   * 経過時間(秒)を計算する
   * @param startDatetime 開始日時
   * @param endDatetime 終了日時
   */
  private calculateDurationInSeconds(startDatetime: string, endDatetime: string): number {
    const startDate = new Date(startDatetime);
    const endDate = new Date(endDatetime);

    // 差分をミリ秒で取得し、1000で割って秒に変換
    const durationInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;

    // 秒数を整数に丸めて返す
    return Math.floor(durationInSeconds);
  }

  async searchRikords(searchDto: SearchRikordsDto): Promise<Rikord[]> {
    const { year, month } = searchDto;

    /* 年月条件(started_atを月の初日〜最終日で抽出する) */
    // 月の初日(Dateの月は0-11なので渡された引数から1引く)
    const startDateOfMonth = new Date(year, month - 1, 1);
    // 月の最終日(翌月0日を指定すると前月最終日となる)
    const endDateOfMonth = new Date(year, month, 0);

    return this.prisma.rikord.findMany({
      include: {
        rikoImage: true,
      },
      where: {
        startedAt: {
          gte: startDateOfMonth,
          lte: endDateOfMonth,
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
    });
  }
}
