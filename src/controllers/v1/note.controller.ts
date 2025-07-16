import { TCreateNoteDTO, TResponseNoteDTO } from '@/dtos/index.js';
import { noteServices } from '@/services/index.js';
import { ApiResponse } from '@/utils/apiResponse.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

class NoteController {
    async createNote(
        req: Request<unknown, unknown, TCreateNoteDTO>,
        res: Response<ApiResponse<TResponseNoteDTO>>,
        next: NextFunction,
    ) {
        try {
            console.log(req.body);
            const note = await noteServices.createNote(req.body);

            res.status(StatusCodes.CREATED).json(
                new ApiResponse(
                    StatusCodes.CREATED,
                    'Note created successfully',
                    note,
                ),
            );
        } catch (error) {
            next(error);
        }
    }
}

export default new NoteController();
