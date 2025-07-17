import {
    TCreateNoteDTO,
    TResponseNoteDTO,
    TUpdateNoteDTO,
} from '@/dtos/index.js';
import { noteServices } from '@/services/index.js';
import { ApiResponse } from '@/utils/apiResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import Logger from '@/utils/logger.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class NoteController {
    createNote = asyncHandler(
        async (
            req: Request<unknown, unknown, TCreateNoteDTO>,
            res: Response<ApiResponse<TResponseNoteDTO>>,
        ) => {
            Logger.info(`Creating a new note with data
                ${JSON.stringify(req.body)}`);

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

    getNoteById = asyncHandler(
        async (
            req: Request<{ id: string }>,
            res: Response<ApiResponse<TResponseNoteDTO>>,
        ) => {
            Logger.info(`Fetching note with id: ${req.params.id}`);
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

    updateNoteById = asyncHandler(
        async (
            req: Request<{ id: string }, unknown, TUpdateNoteDTO>,
            res: Response<ApiResponse<TResponseNoteDTO>>,
        ) => {
            Logger.info(`Updating note with id: ${req.params.id} with data
                ${JSON.stringify(req.body)}`);

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

    deleteNoteById = asyncHandler(
        async (req: Request<{ id: string }>, res: Response) => {
            Logger.info(`Deleting note with id: ${req.params.id}`);

            await noteServices.deleteNoteById(req.params.id);

            res.status(StatusCodes.OK).json(
                new ApiResponse(StatusCodes.OK, 'Note deleted successfully'),
            );
        },
    );
}
export default new NoteController();
