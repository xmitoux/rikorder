import type { Prisma, RikoImageSetting } from '@prisma/client';

export type CreateRikoImageSettingDto = Omit<Prisma.RikoImageSettingCreateManyInput, 'rikoImageId'>;
export type CreateRikoImageWithSettingsDto = { settings: CreateRikoImageSettingDto[] };

export type UpsertRikoImageSettingDto = Prisma.RikoImageSettingCreateManyInput;
export type UpsertRikoImageSettingsDto = { settings: UpsertRikoImageSettingDto[] };

export type GetMonthChartDataListDto = Pick<RikoImageSetting,
  'rikoImageId'
  | 'rikordModeId'
> & {
  year: number;
};
