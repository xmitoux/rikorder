import type { Prisma } from '@prisma/client';
import type { OmitSafe } from 'utils/typeUtils';

export type CreateRikoImageSettingDto = OmitSafe<Prisma.RikoImageSettingCreateManyInput, 'rikoImageId'>;
export type CreateRikoImageWithSettingsDto = { settings: CreateRikoImageSettingDto[] };
