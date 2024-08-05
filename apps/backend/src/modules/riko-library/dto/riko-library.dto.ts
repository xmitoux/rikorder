import { Transform, Type, plainToClass } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsNumber, ValidateNested } from 'class-validator';

import type {
  CreateRikoImageSettingDto as SettingDto,
  CreateRikoImageWithSettingsDto as SettingsDto,
  UpsertRikoImageSettingDto as UpsertSettingDto,
  UpsertRikoImageSettingsDto as UpsertSettingsDto,
} from '@repo/db';

export class CreateRikoImageSettingDto implements SettingDto {
  @IsNumber()
  rikordModeId: number;

  @IsBoolean()
  isFavorite: boolean;
}

export class CreateRikoImageWithSettingsDto implements SettingsDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateRikoImageSettingDto)
  @ValidateNested({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // form-dataがJSONで送られてくるのでパースする
      const parsed = JSON.parse(value);

      // 配列要素をDTOインスタンスに変換し、バリデーションを可能にする
      return Array.isArray(parsed)
        ? parsed.map(item => plainToClass(CreateRikoImageSettingDto, item))
        : parsed;
    }

    return value;
  })
  settings: CreateRikoImageSettingDto[];
}

export class UpsertRikoImageSettingDto implements UpsertSettingDto {
  @IsNumber()
  rikoImageId: number;

  @IsNumber()
  rikordModeId: number;

  @IsBoolean()
  isFavorite: boolean;
}

export class UpsertRikoImageSettingsDto implements UpsertSettingsDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => UpsertRikoImageSettingDto)
  @ValidateNested({ each: true })
  settings: UpsertRikoImageSettingDto[];
}
