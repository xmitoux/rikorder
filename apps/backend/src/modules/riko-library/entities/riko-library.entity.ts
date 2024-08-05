import { Exclude } from 'class-transformer';

import type {
  RikoImageEntity as RikoImage,
  RikoImageDetailEntity as RikoImageDetail,
  RikoImageDetailsEntity as RikoImageDetails,
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

export class RikoImageDetailEntity implements RikoImageDetail {
  rikordModeId: number;
  count: number;
  duration: number;

  constructor({ ...data }: Partial<RikoImageDetailEntity>) {
    Object.assign(this, data);
  }
}

export class RikoImageDetailsEntity implements RikoImageDetails {
  rikoImage: RikoImageEntity;
  details: RikoImageDetailEntity[];

  constructor({ rikoImage, details }: Partial<RikoImageDetailsEntity>) {
    if (rikoImage) {
      this.rikoImage = new RikoImageEntity(rikoImage);
    }

    if (details) {
      this.details = details.map(detail => new RikoImageDetailEntity(detail));
    }
  }
}
