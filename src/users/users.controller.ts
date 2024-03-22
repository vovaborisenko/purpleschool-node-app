import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { UsersService } from './users.service';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  private routes: IControllerRoute[] = [
    {
      path: '/sign-in',
      method: 'post',
      func: this.login,
    },
    {
      path: '/sign-up',
      method: 'post',
      func: this.resister,
      middlewares: [new ValidateMiddleware(UserRegisterDto)],
    },
  ];

  constructor(
    @inject(TYPES.ILogger) logger: ILogger,
    @inject(TYPES.IUsersService) private usersService: UsersService,
  ) {
    super(logger);
    this.bindRoutes(this.routes);
  }

  public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    this.logger.log(req.body);
    next(new HTTPError(401, 'Ошибка авторизации', 'login'));
    // this.ok(res, 'login');
  }

  public async resister(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.createUser(body);

    if (!result) {
      return next(new HTTPError(422, 'Пользователь с таким email уже существует', 'register'));
    }

    this.ok(res, result);
  }
}
