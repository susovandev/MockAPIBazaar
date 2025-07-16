import { StatusCodes } from 'http-status-codes';
export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: boolean;
    constructor(message: string) {
        super(message);
    }
}

export class BadRequestException extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;
    status = false;
    constructor(message: string) {
        super(message);
    }
}

export class NotFoundException extends CustomError {
    statusCode = StatusCodes.NOT_FOUND;
    status = false;
    constructor(message: string) {
        super(message);
    }
}

export class UnauthorizedException extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;
    status = false;
    constructor(message: string) {
        super(message);
    }
}

export class ForbiddenException extends CustomError {
    statusCode = StatusCodes.FORBIDDEN;
    status = false;
    constructor(message: string) {
        super(message);
    }
}

export class ConflictException extends CustomError {
    statusCode = StatusCodes.CONFLICT;
    status = false;
    constructor(message: string) {
        super(message);
    }
}

export class ServerException extends CustomError {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    status = false;
    constructor(message: string) {
        super(message);
    }
}
