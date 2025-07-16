import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

const schemaValidator = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                StatusCode: StatusCodes.BAD_REQUEST,
                message: error.details.map((err) =>
                    err.message.replaceAll('"', ''),
                ),
            });
        }
        next();
    };
};

export default schemaValidator;
