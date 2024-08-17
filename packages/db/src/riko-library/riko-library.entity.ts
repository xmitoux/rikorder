import type { RikoImageSetting } from '@prisma/client';

import type { RikoImageEntity } from '../riko_image/riko_image.entity';

export type RikoImageSettingEntity = RikoImageSetting;

export type RikoImageSettingEntityResponse = Pick<RikoImageSetting,
  'rikoImageId'
  | 'rikordModeId'
  | 'isFavorite'
>;

export type YearChartDataEntity = {
  year: number;
  count: number;
  duration: number;
};

export type RikoImageDetailEntity = Pick<RikoImageSetting,
  'rikordModeId'
> & {
  count: number;
  duration: number;
  yearDataList: YearChartDataEntity[];
};

export type RikoImageDetailEntityResponse = RikoImageDetailEntity;

export type RikoImageDetailsEntity = {
  rikoImage: RikoImageEntity;
  details: RikoImageDetailEntity[];
};

export type RikoImageDetailsEntityResponse = RikoImageDetailsEntity;

export type MonthChartDataEntity = {
  month: number;
  count: number;
  duration: number;
};

export type MonthChartDataListEntity = Pick<RikoImageSetting,
  'rikoImageId'
  | 'rikordModeId'
> & {
  year: number;
  monthDataList: MonthChartDataEntity[];
};
