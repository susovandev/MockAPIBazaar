import { TCreateNoteDTO, TResponseNoteDTO } from '@/dtos/index.js';
import { noteServices } from '@/services/index.js';
import { ApiResponse } from '@/utils/apiResponse.js';
import { Request, Response, NextFunction } from 'express';

class NoteController {
    async createNote(
        req: Request<unknown, unknown, TCreateNoteDTO>,
        res: Response<ApiResponse<TResponseNoteDTO>>,
        next: NextFunction,
    ) {
        try {
            console.log(req.body);
            const note = await noteServices.createNote(req.body);

            res.status(201).json(
                new ApiResponse(201, 'Note created successfully', note),
            );
        } catch (error) {
            next(error);
        }
    }
}

export default new NoteController();
