import { noteControllers } from '@/controllers/index.js';
import schemaValidator from '@/middlewares/validation.middleware.js';
import { CreateNoteSchema, UpdateNoteSchema } from '@/validations/index.js';
import { Router } from 'express';

const noteRouter: Router = Router();

noteRouter
    .route('/')
    .post(schemaValidator(CreateNoteSchema), noteControllers.createNote);
noteRouter.route('/:id').get(noteControllers.getNoteById);
noteRouter
    .route('/:id')
    .put(schemaValidator(UpdateNoteSchema), noteControllers.updateNoteById);

export default noteRouter;
