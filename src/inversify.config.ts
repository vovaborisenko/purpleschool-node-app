import { ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './logger/logger.service';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { IUsersController } from './users/users.controller.interface';
import { UsersController } from './users/users.controller';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUserRepository } from './users/users.repository.interface';
import { UserRepository } from './users/users.repository';
import { App } from './app';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();

  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<IUsersController>(TYPES.IUsersController).to(UsersController);
  bind<IUsersService>(TYPES.IUsersService).to(UsersService);
  bind<App>(TYPES.Application).to(App);
});

export { appBindings };
