import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

import type { CreateRikordDto as Dto, SearchRikordsDto as SearchDto } from '@repo/db';

export class CreateRikordDto implements Dto {
  @IsNotEmpty()
  @IsNumber()
  rikoImageId: number;

  @IsNotEmpty()
  @IsNumber()
  rikordModeId: number;

  @IsNotEmpty()
  @IsISO8601({ strict: true, strictSeparator: true })
  startedAt: string;

  @IsNotEmpty()
  @IsISO8601({ strict: true, strictSeparator: true })
  finishedAt: string;
}

export class SearchRikordsDto implements SearchDto {
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  month: number;
}
