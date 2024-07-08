import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, ValidateNested } from 'class-validator';

import type { CreateRikoImageSettingDto as SettingDto, CreateRikoImageWithSettingsDto as SettingsDto } from '@repo/db';

export class CreateRikoImageSettingDto implements SettingDto {
  @IsNumber()
  rikordModeId: number;

  @IsBoolean()
  isFavorite: boolean;
}

export class CreateRikoImageWithSettingsDto implements SettingsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRikoImageSettingDto)
  settings: CreateRikoImageSettingDto[];
}
