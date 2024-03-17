import { UsersController } from './users/users.controller';
import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from './logger/logger.service';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    users: UsersController;

    constructor(logger: LoggerService, users: UsersController) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.users = users;
    }

    public useRoutes() {
        this.app.use('/users', this.users.router);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
