import { PartialType } from '@nestjs/mapped-types';

import { RikoImageCreateDto } from './riko_image.dto';

export class UpdateRikoImageDto extends PartialType(RikoImageCreateDto) {}
