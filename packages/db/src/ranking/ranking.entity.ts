import type { RikoImageEntity } from '../riko_image/riko_image.entity';

export type RankingEntity = {
  rikoImage: RikoImageEntity;
  rank: number;
  rankValue: number;
};

export type RankingEntityResponse = RankingEntity;
