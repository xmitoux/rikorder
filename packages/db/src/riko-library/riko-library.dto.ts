import type { Prisma } from '@prisma/client';

export type CreateRikoImageSettingDto = Omit<Prisma.RikoImageSettingCreateManyInput, 'rikoImageId'>;
export type CreateRikoImageWithSettingsDto = { settings: CreateRikoImageSettingDto[] };

export type UpsertRikoImageSettingDto = Prisma.RikoImageSettingCreateManyInput;
export type UpsertRikoImageSettingsDto = { settings: UpsertRikoImageSettingDto[] };
