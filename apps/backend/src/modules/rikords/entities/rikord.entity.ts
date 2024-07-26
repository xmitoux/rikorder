import { Exclude } from 'class-transformer';

import { RikoImageEntity } from '~/modules/riko-library/entities/riko-library.entity';

import type { RikordEntity as Rikord } from '@repo/db';

export class RikordEntity implements Rikord {
  id: number;
  rikoImageId: number;
  rikoImage: RikoImageEntity;
  rikordModeId: number;
  startedAt: Date;
  finishedAt: Date;
  duration: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor({ rikoImage, ...data }: Partial<RikordEntity>) {
    Object.assign(this, data);

    if (rikoImage) {
      this.rikoImage = new RikoImageEntity(rikoImage);
    }
  }
}
