import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import type {
  GetRankingDto as GetDto,
} from '@repo/db';

export class GetRankingDto implements GetDto {
  @IsNotEmpty()
  @IsNumber()
  rikordModeId: number;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsNumber()
  month?: number;
}
