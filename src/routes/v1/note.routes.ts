import { noteControllers } from '@/controllers/index.js';
import schemaValidator from '@/middlewares/validation.middleware.js';
import { createNoteSchema, updateNoteSchema } from '@/validations/index.js';
import { Router } from 'express';

const noteRouter: Router = Router();

noteRouter
    .route('/')
    .post(schemaValidator(createNoteSchema), noteControllers.createNote);
noteRouter.route('/:id').get(noteControllers.getNoteById);
noteRouter
    .route('/:id')
    .put(schemaValidator(updateNoteSchema), noteControllers.updateNoteById);
noteRouter.route('/:id').delete(noteControllers.deleteNoteById);

// Extra features
noteRouter.route('/:id/pin').patch(noteControllers.togglePinNote);
noteRouter.route('/:id/archive').patch(noteControllers.toggleArchiveNote);
noteRouter.route('/:id/trash').patch(noteControllers.toggleTrashNote);
noteRouter.route('/:id/color').patch(noteControllers.changeNoteColor);
export default noteRouter;
