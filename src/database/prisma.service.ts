import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  public async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService] успешное подключение к базе данных');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('[PrismaService] ошибка подключения к базе данных' + error.message);
      }
    }
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
