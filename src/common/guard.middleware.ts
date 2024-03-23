import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
import { HTTPError } from '../errors/http-error.class';

export class GuardMiddleware implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
      return next(new HTTPError(403, 'Forbidden', 'guard'));
    }

    next();
  }
}
