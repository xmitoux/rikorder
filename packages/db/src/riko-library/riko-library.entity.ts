import type { RikoImageSetting } from '@prisma/client';

export type RikoImageSettingEntity = RikoImageSetting;

export type RikoImageSettingEntityResponse = Pick<RikoImageSetting,
  'rikoImageId'
  | 'rikordModeId'
  | 'isFavorite'
>;
