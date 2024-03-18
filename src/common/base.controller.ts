import { Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(@inject(TYPES.ILogger) protected logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): Response<T, Record<string, unknown>> {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): Response<T, Record<string, unknown>> {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): Response<unknown, Record<string, unknown>> {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      const handler = route.func.bind(this);

      this.logger.log(`${[route.method]} ${route.path}`);
      this.router[route.method](route.path, handler);
    }
  }
}
