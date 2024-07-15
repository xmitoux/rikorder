import type { Prisma } from '@prisma/client';

export type CreateRikordDto = Pick<Prisma.RikordCreateManyInput,
  'rikoImageId'
  | 'rikordModeId'
  | 'startedAt'
  | 'finishedAt'
>;
