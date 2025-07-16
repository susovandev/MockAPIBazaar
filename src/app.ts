import express, { Application } from 'express';
import connectDB from '@/db/db.js';
import { config } from '@/config/_config.js';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    async start() {
        await this.databaseConnection();
        this.serverListen();
    }

    private async databaseConnection() {
        await connectDB();
    }
    private serverListen() {
        this.app.listen(config.port, () => {
            console.log(
                `Server is running on http://localhost:${config.port} in ${config.node_env} mode`,
            );
        });
    }
}
