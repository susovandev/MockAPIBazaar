import { TCreateNoteDTO, TResponseNoteDTO } from '@/dtos/index.js';
import { noteServices } from '@/services/index.js';
import { ApiResponse } from '@/utils/apiResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import Logger from '@/utils/logger.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongoose';

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
        async (req: Request<{ id: ObjectId }>, res: Response) => {
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
}
export default new NoteController();
