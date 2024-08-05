import { RikoImageEntity } from '~/modules/riko-library/entities/riko-library.entity';

import type { RankingEntity as Ranking } from '@repo/db';

export class RankingEntity implements Ranking {
  rikoImage: RikoImageEntity;
  rank: number;
  rankValue: number;

  constructor({ rikoImage, ...data }: Partial<RankingEntity>) {
    Object.assign(this, data);

    if (rikoImage) {
      this.rikoImage = new RikoImageEntity(rikoImage);
    }
  }
}
