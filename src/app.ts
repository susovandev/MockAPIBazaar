import express, { Request, Response, Application, NextFunction } from 'express';
import connectDB from '@/db/db.js';
import { config } from '@/config/_config.js';
import { appRoutes } from './routes/index.js';
import globalErrorHandler from './middlewares/error.middleware.js';
import { NotFoundException } from './utils/customErrors.js';
import Logger from './utils/logger.js';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    async start() {
        await this.databaseConnection();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupGlobalErrors();
        this.serverListen();
    }

    private async databaseConnection() {
        await connectDB();
    }

    private setupMiddlewares() {
        this.app.use(express.json({ limit: '10kb', strict: true }));
        this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    }
    private setupRoutes() {
        appRoutes(this.app);
    }

    private setupGlobalErrors() {
        this.app.all(
            '/*splat',
            (req: Request, _: Response, next: NextFunction) => {
                next(
                    new NotFoundException(
                        `Can't find ${req.originalUrl} on this server!`,
                    ),
                );
            },
        );
        this.app.use(globalErrorHandler);
    }
    private serverListen() {
        this.app.listen(config.port, () => {
            Logger.debug(
                `Server is running on http://localhost:${config.port} in ${config.node_env} mode`,
            );
        });
    }
}
