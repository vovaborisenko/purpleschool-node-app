import { config, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const { error, parsed } = config();

    if (error) {
      this.logger.warn('[ConfigService] Ошибка загрузки .env');
    } else if (parsed) {
      this.logger.log('[ConfigService] Загружен .env');
      this.config = parsed;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
