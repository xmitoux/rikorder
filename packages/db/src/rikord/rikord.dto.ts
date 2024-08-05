import type { Prisma } from '@prisma/client';

export type CreateRikordDto = Pick<Prisma.RikordCreateManyInput,
  'rikoImageId'
  | 'rikordModeId'
  | 'startedAt'
  | 'finishedAt'
>;

export type UpdateRikordDto = Required<Pick<Prisma.RikordCreateManyInput,
  'id'
  | 'rikoImageId'
  | 'startedAt'
  | 'finishedAt'
>>;

export type SearchRikordsDto = {
  year: number;
  month: number;
};
