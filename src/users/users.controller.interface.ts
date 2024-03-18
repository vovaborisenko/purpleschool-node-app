import { NextFunction, Request, Response } from 'express';

export interface IUsersController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  resister: (req: Request, res: Response, next: NextFunction) => void;
}
