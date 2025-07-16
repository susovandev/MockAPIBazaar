import { NextFunction, Request, Response } from 'express';

export const asyncHandler =
    <P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>(
        fn: (
            req: Request<P, ResBody, ReqBody, ReqQuery>,
            res: Response,
            next: NextFunction,
        ) => Promise<void>,
    ) =>
    (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response,
        next: NextFunction,
    ) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
