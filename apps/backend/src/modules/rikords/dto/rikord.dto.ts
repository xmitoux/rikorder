import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

import type { CreateRikordDto as Dto } from '@repo/db';

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
