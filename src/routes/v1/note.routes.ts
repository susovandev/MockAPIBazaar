import { noteControllers } from '@/controllers/index.js';
import { Router } from 'express';

const noteRouter: Router = Router();

noteRouter.route('/').post(noteControllers.createNote);

export default noteRouter;
