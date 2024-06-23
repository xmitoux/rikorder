import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

import type { RikoImageCreateDto as Dto } from '@repo/db';

export class RikoImageCreateDto implements Dto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsDateString()
  @IsNotEmpty()
  uploadedAt: string | Date;
}
