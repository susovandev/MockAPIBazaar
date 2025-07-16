/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from '@/config/_config.js';
import { CustomError } from '@/utils/customErrors.js';
import Logger from '@/utils/logger.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const globalErrorHandler = (
    err: unknown,
    _: Request,
    res: Response,
    _next: NextFunction,
) => {
    Logger.error(`[Global Error]: ${err}`);
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: err.status,
            StatusCode: err.statusCode,
            message: err.message,
        });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err || 'Something went wrong',
        ...(config.node_env === 'production'
            ? {}
            : { stack: err instanceof Error ? err.stack : '' }),
    });
};

export default globalErrorHandler;
