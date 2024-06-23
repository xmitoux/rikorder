import { Injectable } from '@nestjs/common';
import { CreateRikoImageDto } from './dto/create-riko_image.dto';
import { UpdateRikoImageDto } from './dto/update-riko_image.dto';

@Injectable()
export class RikoImagesService {
  create(createRikoImageDto: CreateRikoImageDto) {
    return 'This action adds a new rikoImage';
  }

  findAll() {
    return `This action returns all rikoImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rikoImage`;
  }

  update(id: number, updateRikoImageDto: UpdateRikoImageDto) {
    return `This action updates a #${id} rikoImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} rikoImage`;
  }
}
