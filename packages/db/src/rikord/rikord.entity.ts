import type { Rikord } from '@prisma/client';

import type { RikoImageEntity } from '../riko_image/riko_image.entity';

export type RikordEntity = Pick<Rikord,
  'id'
  | 'rikoImageId'
  | 'rikordModeId'
  | 'startedAt'
  | 'finishedAt'
  | 'duration'
  // 以下はレスポンスに不要だが、nestでexcludeするため定義は残しておく
  | 'createdAt'
  | 'updatedAt'
  > & {
    // リレーションのtypeを追加
    rikoImage: RikoImageEntity;
  };

export type RikordEntityResponse = Omit<RikordEntity,
  'startedAt'
  | 'finishedAt'
  | 'createdAt'
  | 'updatedAt'
  > & {
    // Date型の日時データはレスポンスでは文字列になるのでOmitして変換する
    startedAt: string;
    finishedAt: string;
  };

export type RikordInfoEntity = {
  lastDatetime: string;
  totalCount: number;
  totalDuration: number;
  monthlyGoal: number;
};

export type RikordInfoEntityResponse = RikordInfoEntity;
