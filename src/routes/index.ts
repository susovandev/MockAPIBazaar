import { Application } from 'express';
import noteRouter from './v1/note.routes.js';

export const appRoutes = (app: Application) => {
    app.use('/api/v1/notes', noteRouter);
};
