import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { BaseController } from '../common/base.controller';
import { IUsersController } from './users.controller.interface';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController implements IUsersController {
    private routes: IControllerRoute[] = [
        {
            path: '/sign-in',
            method: 'post',
            func: this.login
        },
        {
            path: '/sign-up',
            method: 'post',
            func: this.resister
        }
    ];

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        super(logger);
        this.bindRoutes(this.routes);
    }

    public login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'Ошибка авторизации', 'login'));
        // this.ok(res, 'login');
    }

    public resister(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'registration');
    }
}
