import { Injectable } from '@nestjs/common';

import { Rikord } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';

import { CreateRikordDto } from './dto/rikord.dto';

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
}
