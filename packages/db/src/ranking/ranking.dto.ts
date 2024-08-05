import type { Prisma } from '@prisma/client';

export type GetRankingDto = Pick<Prisma.RikordCreateManyInput,
  'rikordModeId'
> & {
  year?: number;
  month?: number;
};
