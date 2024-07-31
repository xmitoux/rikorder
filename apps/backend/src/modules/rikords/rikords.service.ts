import { Injectable } from '@nestjs/common';

import { Rikord } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';
import { dateUtils } from '~/utils/dateUtils';

import { CreateRikordDto, SearchRikordsDto, UpdateRikordDto } from './dto/rikord.dto';
import { RikordInfoEntity } from './entities/rikord.entity';

const { getStartAndEndDateOfMonth } = dateUtils();

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
    const { startDateOfMonth, endDateOfMonth } = getStartAndEndDateOfMonth(new Date(year, month - 1));

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

  async getRikordInfo(rikordModeId: number): Promise<RikordInfoEntity> {
    // 前回Rikord日時
    const latestRikord = await this.prisma.rikord.findFirst({
      where: {
        rikordModeId,
      },
      orderBy: {
        finishedAt: 'desc',
      },
    });

    // 当月回数・duraiton集計
    const { startDateOfMonth, endDateOfMonth } = getStartAndEndDateOfMonth(new Date());
    const result = await this.prisma.rikord.aggregate({
      where: {
        rikordModeId,
        startedAt: {
          gte: startDateOfMonth,
          lte: endDateOfMonth,
        },
      },
      _count: {
        duration: true,
      },
      _sum: {
        duration: true,
      },
    });

    return {
      lastDatetime: latestRikord?.finishedAt.toISOString() ?? '',
      totalCount: result._count.duration,
      totalDuration: result._sum.duration ?? 0,
      // TODO: 目標を取得
      monthlyGoal: 919,
    };
  }

  updateRikord({ id, ...data }: UpdateRikordDto): Promise<Rikord> {
    const duration = this.calculateDurationInSeconds(data.startedAt, data.finishedAt);

    return this.prisma.rikord.update({
      where: {
        id,
      },
      data: {
        ...data,
        duration,
      },
    });
  }

  deleteRikord(id: number): Promise<Rikord> {
    return this.prisma.rikord.delete({
      where: { id },
    });
  }
}
