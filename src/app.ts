import express, { Application } from 'express';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    start() {
        this.serverListen();
    }

    private serverListen() {
        this.app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }
}
