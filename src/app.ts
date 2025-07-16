import express, { Application } from 'express';
import connectDB from '@/db/db.js';
import { config } from '@/config/_config.js';
import { appRoutes } from './routes/index.js';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    async start() {
        await this.databaseConnection();
        this.setupMiddlewares();
        this.setupRoutes();
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
    private serverListen() {
        this.app.listen(config.port, () => {
            console.log(
                `Server is running on http://localhost:${config.port} in ${config.node_env} mode`,
            );
        });
    }
}
