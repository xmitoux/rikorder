import { Exclude } from 'class-transformer';

import type {
  RikoImageEntity as RikoImage,
  RikoImageSettingEntity as RikoImageSetting,
} from '@repo/db';

export class RikoImageEntity implements RikoImage {
  id: number;
  url: string;
  uploadedAt: Date;

  constructor({ ...data }: Partial<RikoImageEntity>) {
    Object.assign(this, data);
  }
}

export class RikoImageSettingEntity implements RikoImageSetting {
  @Exclude()
  id: number;

  rikoImageId: number;
  rikordModeId: number;
  isFavorite: boolean;

  constructor({ ...data }: Partial<RikoImageSettingEntity>) {
    Object.assign(this, data);
  }
}
