import { Injectable } from '@nestjs/common';

import { RikoImage } from '@repo/db/dist';

import { PrismaService } from '~/common/services/prisma.service';

import { RikoImageCreateDto } from './dto/riko_image.dto';
import { UpdateRikoImageDto } from './dto/update-riko_image.dto';

@Injectable()
export class RikoImagesService {
  constructor(private prisma: PrismaService) {}

  create(data: RikoImageCreateDto): Promise<RikoImage> {
    return this.prisma.rikoImage.create({
      data,
    });
  }

  findAll(): Promise<RikoImage[]> {
    return this.prisma.rikoImage.findMany();
  }

  findOne(id: number): Promise<RikoImage> {
    return this.prisma.rikoImage.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateRikoImageDto: UpdateRikoImageDto) {
    return `This action updates a #${id} rikoImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} rikoImage`;
  }
}
