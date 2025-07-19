import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ICreateNoteDto, IUpdateNoteDto } from '@/interfaces/index.js';
import { noteServices } from '@/services/index.js';
import { ApiResponse } from '@/utils/apiResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import Logger from '@/utils/logger.js';
import { config } from '@/config/_config.js';

/**
 * Controller class to handle HTTP requests for notes.
 */
class NoteController {
    /**
     * Create a new note.
     */
    createNote = asyncHandler(
        async (
            req: Request<unknown, unknown, ICreateNoteDto>,
            res: Response,
        ) => {
            Logger.info(
                `Creating a new note with data: ${JSON.stringify(req.body)}`,
            );

            const note = await noteServices.createNote(req.body);

            res.status(StatusCodes.CREATED).json(
                new ApiResponse(
                    StatusCodes.CREATED,
                    'Note created successfully',
                    note,
                ),
            );
        },
    );

    /**
     * Retrieve all notes.
     */
    getAllNotes = asyncHandler(
        async (
            req: Request<
                unknown,
                unknown,
                unknown,
                { page: string; limit: string }
            >,
            res: Response,
        ) => {
            const page = parseInt(req.query.page) || config.pagination.page; // get default page number from .env
            const limit = parseInt(req.query.limit) || config.pagination.limit; /// get default limit number from .env
            Logger.info(
                `Fetching all notes with page: ${page} and limit: ${limit}`,
            );

            const result = await noteServices.getAllNotes(page, limit);

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Notes fetched successfully',
                    result,
                ),
            );
        },
    );

    /**
     * Get a note by ID.
     */
    getNoteById = asyncHandler(
        async (req: Request<{ id: string }>, res: Response) => {
            Logger.info(`Fetching note with ID: ${req.params.id}`);

            const note = await noteServices.getNoteById(req.params.id);

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Note fetched successfully',
                    note,
                ),
            );
        },
    );

    /**
     * Update a note by ID.
     */
    updateNoteById = asyncHandler(
        async (
            req: Request<{ id: string }, unknown, IUpdateNoteDto>,
            res: Response,
        ) => {
            Logger.info(
                `Updating note with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`,
            );

            const note = await noteServices.updateNoteById(
                req.params.id,
                req.body,
            );

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Note updated successfully',
                    note,
                ),
            );
        },
    );

    /**
     * Delete a note by ID.
     */
    deleteNoteById = asyncHandler(
        async (req: Request<{ id: string }>, res: Response) => {
            Logger.info(`Deleting note with ID: ${req.params.id}`);

            await noteServices.deleteNoteById(req.params.id);

            res.status(StatusCodes.OK).json(
                new ApiResponse(StatusCodes.OK, 'Note deleted successfully'),
            );
        },
    );

    // ----------- Extra Feature Methods -----------

    /**
     * Trash a note by ID.
     */
    softDelete = asyncHandler(
        async (req: Request<{ id: string }>, res: Response) => {
            Logger.info(`Thrashing note with ID: ${req.params.id}`);

            const note = await noteServices.softDelete(req.params.id);

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Note Trashed successfully',
                    note,
                ),
            );
        },
    );

    /**
     * Toggle the pinned status of a note.
     */
    togglePinNote = asyncHandler(
        async (req: Request<{ id: string }>, res: Response) => {
            Logger.info(`Toggling pin for note ID: ${req.params.id}`);

            const note = await noteServices.togglePinNote(req.params.id);

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Pin toggled successfully',
                    note,
                ),
            );
        },
    );

    /**
     * Toggle the archived status of a note.
     */
    toggleArchiveNote = asyncHandler(
        async (req: Request<{ id: string }>, res: Response) => {
            Logger.info(`Toggling archive for note ID: ${req.params.id}`);

            const note = await noteServices.toggleArchiveNote(req.params.id);

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Archive toggled successfully',
                    note,
                ),
            );
        },
    );

    /**
     * Toggle the trashed status of a note.
     */
    toggleTrashNote = asyncHandler(
        async (req: Request<{ id: string }>, res: Response) => {
            Logger.info(`Toggling trash for note ID: ${req.params.id}`);

            const note = await noteServices.toggleTrashNote(req.params.id);

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Trash toggled successfully',
                    note,
                ),
            );
        },
    );

    /**
     * Change the color of a note.
     */
    changeNoteColor = asyncHandler(
        async (
            req: Request<{ id: string }, unknown, { colorLabel: string }>,
            res: Response,
        ) => {
            Logger.info(
                `Changing color of note ID: ${req.params.id} to ${req.body.colorLabel}`,
            );

            const note = await noteServices.changeNoteColor(
                req.params.id,
                req.body.colorLabel,
            );

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Color changed successfully',
                    note,
                ),
            );
        },
    );

    /**
     * Set a reminder for a not
     */
    setReminderNote = asyncHandler(
        async (
            req: Request<{ id: string }, unknown, { date: Date }>,
            res: Response,
        ) => {
            Logger.info(
                `Reminding note ID: ${req.params.id} to ${req.body.date}`,
            );

            const note = await noteServices.setReminderNote(
                req.params.id,
                req.body.date,
            );

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Reminder set successfully',
                    note,
                ),
            );
        },
    );
}

export default new NoteController();
