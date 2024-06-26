import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { json } from 'body-parser';
import { TYPES } from './types';
import { AuthMiddleware } from './common/auth.middleware';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import 'reflect-metadata';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IConfigService) private config: IConfigService,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
    @inject(TYPES.IUsersController) private users: UsersController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
    this.port = 8000;
  }

  private useMiddlewares(): void {
    const authMiddleware = new AuthMiddleware(this.config.get('SECRET'));

    this.app.use(json());
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  private useRoutes(): void {
    this.app.use('/users', this.users.router);
  }

  private useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddlewares();
    this.useRoutes();
    this.useExceptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }

  public close(): void {
    this.server.close();
  }
}
