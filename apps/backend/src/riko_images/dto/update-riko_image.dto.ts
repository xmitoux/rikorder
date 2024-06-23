import { PartialType } from '@nestjs/mapped-types';
import { CreateRikoImageDto } from './create-riko_image.dto';

export class UpdateRikoImageDto extends PartialType(CreateRikoImageDto) {}
