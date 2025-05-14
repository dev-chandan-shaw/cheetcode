import { NextFunction, Request, Response } from "express";
import { AsyncFunctionHandler, AsyncHandler } from "../types/core.types";
import { ErrorHelper } from "../helpers/error.helper";
import ErrorHandler from "../middlewares/error.middleware";
/**
 * A utility class that provides methods for wrapping asynchronous functions and handlers with try-catch blocks.
 * 
 * @method wrapHandler: Wraps an asynchronous handler function with a try-catch block to handle errors.
 * @method wrapFunction: Wraps an asynchronous function with a try-catch block and handles errors by throwing a custom error.
 */
export default class AsyncUtils {
    /**
     * Wraps an asynchronous handler function with a try-catch block to handle errors.
     *
     * @param {AsyncHandler} handler - The asynchronous handler function to be wrapped.
     * @returns {Function} A wrapped function that handles errors using the `ErrorHandler` class.
     */
    wrapHandler(handler: AsyncHandler): any {
        return async function (req: Request, res: Response, next: NextFunction) {
            try {
                await handler(req, res, next);
            } catch (err: any) {
                new ErrorHandler().handleErrors(req,res,err);
            }
        }
    }
    /**
     * Wraps an asynchronous function with a try-catch block and handles errors by throwing a custom error.
     *
     * @param {AsyncFunctionHandler} func - The asynchronous function to be wrapped.
     * @param {Array<any>} args - An array of arguments to be passed to the asynchronous function.
     * @returns {Promise<any>} A Promise that resolves with the result of the asynchronous function or rejects with a custom error.
     */
    async wrapFunction(func: AsyncFunctionHandler, args: Array<any>): Promise<any> {
        try {
            return await func(...args);
        } catch (err: any) {
            throw new ErrorHelper().customError(err.message, err.statusCode);
        }
    }
}