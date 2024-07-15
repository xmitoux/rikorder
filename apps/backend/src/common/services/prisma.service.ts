import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

import { Prisma, PrismaClient } from '@repo/db';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(`[Query] ${event.query} [Params] ${event.params} [Duration] ${event.duration} ms`);
    });

    this.$on('info', (event) => {
      this.logger.log(`message: ${event.message}`);
    });

    this.$on('error', (event) => {
      this.logger.log(`error: ${event.message}`);
    });

    this.$on('warn', (event) => {
      this.logger.log(`warn: ${event.message}`);
    });

    await this.$connect();
  }
}
