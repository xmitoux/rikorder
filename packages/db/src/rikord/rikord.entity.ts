import type { Rikord } from '@prisma/client';

export type RikordEntity = Pick<Rikord,
  'id'
  | 'rikoImageId'
  | 'rikordModeId'
  | 'startedAt'
  | 'finishedAt'
  | 'duration'
  | 'createdAt'
  | 'updatedAt'
  >;

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
