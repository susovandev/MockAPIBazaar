import Logger from '@/utils/logger.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

const schemaValidator = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: true,
        });
        Logger.info(`Validation result: ${JSON.stringify(value)}`);
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                StatusCode: StatusCodes.BAD_REQUEST,
                message: error.details.map((err) =>
                    err.message.replaceAll('"', ''),
                ),
            });
            return;
        }
        req.body = value;
        next();
    };
};

export default schemaValidator;
