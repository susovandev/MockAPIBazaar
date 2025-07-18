import { Router } from 'express';

import { noteControllers } from '@/controllers/index.js';
import schemaValidator from '@/middlewares/validation.middleware.js';
import { createNoteSchema, updateNoteSchema } from '@/validations/index.js';

const noteRouter: Router = Router();

/**
 * @route   POST /api/notes/
 * @desc    Create a new note
 * @access  Public (or use auth middleware if needed)
 */
noteRouter
    .route('/')
    .post(schemaValidator(createNoteSchema), noteControllers.createNote);

/**
 * @route   GET /api/notes/:id
 * @desc    Get note by ID
 * @access  Public
 */
noteRouter.route('/:id').get(noteControllers.getNoteById);

/**
 * @route   PUT /api/notes/:id
 * @desc    Update a note by ID
 * @access  Public
 */
noteRouter
    .route('/:id')
    .put(schemaValidator(updateNoteSchema), noteControllers.updateNoteById);

/**
 * @route   DELETE /api/notes/:id
 * @desc    Delete a note by ID
 * @access  Public
 */
noteRouter.route('/:id').delete(noteControllers.deleteNoteById);

// ----------- Extra Feature Routes -----------

/**
 * @route   PATCH /api/notes/:id/pin
 * @desc    Toggle pin status for a note
 */
noteRouter.route('/:id/pin').patch(noteControllers.togglePinNote);

/**
 * @route   PATCH /api/notes/:id/archive
 * @desc    Toggle archive status for a note
 */
noteRouter.route('/:id/archive').patch(noteControllers.toggleArchiveNote);

/**
 * @route   PATCH /api/notes/:id/trash
 * @desc    Toggle trash status for a note
 */
noteRouter.route('/:id/trash').patch(noteControllers.toggleTrashNote);

/**
 * @route   PATCH /api/notes/:id/color
 * @desc    Change color label of a note
 */
noteRouter.route('/:id/color').patch(noteControllers.changeNoteColor);

export default noteRouter;
