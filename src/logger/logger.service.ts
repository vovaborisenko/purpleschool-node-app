import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.interface';

export class LoggerService implements ILogger {
    private logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger({
            prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}} '
        });
    }

    public log(...args: unknown[]) {
        this.logger.info(...args);
    }

    public warn(...args: unknown[]) {
        this.logger.warn(...args);
    }

    public error(...args: unknown[]) {
        this.logger.error(...args);
    }
}
