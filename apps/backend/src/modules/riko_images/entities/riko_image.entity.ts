import type { RikoImageEntity as RikoImage } from '@repo/db';

export class RikoImageEntity implements RikoImage {
  id: number;
  url: string;
  uploadedAt: Date;

  constructor({ ...data }: Partial<RikoImageEntity>) {
    Object.assign(this, data);
  }
}
