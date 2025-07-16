import { App } from '@/app.js';

class Main {
    run() {
        const app = new App();
        app.start();
    }
}

const main = new Main();
main.run();
