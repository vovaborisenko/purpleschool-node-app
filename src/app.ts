import { UsersController } from './users/users.controller';
import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from './logger/logger.service';
import { ExceptionFilter } from './errors/exception.filter';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    users: UsersController;
    exceptionFilter: ExceptionFilter;

    constructor(
        logger: LoggerService,
        users: UsersController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.users = users;
        this.exceptionFilter = exceptionFilter;
    }

    public useRoutes() {
        this.app.use('/users', this.users.router);
    }

    public useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
