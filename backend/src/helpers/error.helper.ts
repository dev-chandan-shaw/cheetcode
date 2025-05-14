import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * Represents a custom error with a specific status code.
 * @class CustomError
 */
class CustomError extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * Class representing an Error Helper that handles different types of errors and returns corresponding custom error objects.
 * @class ErrorHelper
 */
export class ErrorHelper {
    /**
     * Returns an instance of BadRequestError, NotFoundError, or CustomError based on the provided error and optional status code.
     * @param {any} error The error object to determine the type of error to return.
     * @param {number} statusCode Optional status code to be used in the CustomError instance.
     * @returns {BadRequestError | NotFoundError | CustomError} An instance of error, or CustomError with a default status code.
     */
    customError(error: any, statusCode?: number): BadRequestError | NotFoundError | CustomError {
        if (error.name === "ValidationError")
            return new BadRequestError(error.message);
        else if (error.name === "CastError")
            return new NotFoundError(`No item found with ${error.value}!`);
        else if (error.code && error.code === 11000)
            return new BadRequestError(`Duplicate value entered for ${Object.keys(error.keyValue)} field!`);
        else
            return new CustomError(error.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR, statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Represents a custom error for bad requests.
 * @constructor
 * @param {string} message - The error message to be displayed.
 */
export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

/**
 * Represents a custom error for resource not found (404 status code).
 * @constructor
 * @param {string} message - The error message to be displayed.
 */
export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

/**
 * Represents a custom error for Unauthorized Error.
 * @constructor
 * @param {string} message - The error message.
 */
export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

/**
 * Represents a custom error for Forbidden Error.
 * @constructor
 * @param {string} message - The error message.
 */
export class ForbiddenError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.FORBIDDEN);
    }
}