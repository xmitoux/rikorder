import { Exclude } from 'class-transformer';

import type { RikordEntity as Rikord } from '@repo/db';

export class RikordEntity implements Rikord {
  id: number;
  rikoImageId: number;
  rikordModeId: number;
  startedAt: Date;
  finishedAt: Date;
  duration: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor({ ...data }: Partial<RikordEntity>) {
    Object.assign(this, data);
  }
}
