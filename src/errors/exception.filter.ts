import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

export class ExceptionFilter implements IExceptionFilter {
    constructor(private logger: LoggerService) { }

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`[${err.context}] ${err.statusCode}: ${err.message}`);
            res.status(err.statusCode).send({ message: err.message });
        } else {
            this.logger.error(err.message);
            res.status(500).send({ message: err.message });
        }
    }
}
