import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

import type { CreateRikordDto as Dto } from '@repo/db';

export class CreateRikordDto implements Dto {
  @IsNotEmpty()
  @IsNumber()
  rikoImageId: number;

  @IsNotEmpty()
  @IsNumber()
  rikordModeId: number;

  @IsNotEmpty()
  @IsDateString()
  startedAt: string;

  @IsNotEmpty()
  @IsDateString()
  finishedAt: string;
}
