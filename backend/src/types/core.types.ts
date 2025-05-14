import { NextFunction, Request, Response } from "express"

/**
 * Represents an environment object, which is a recursive data structure that can hold various types of values.
 *
 * @typedef {Object} Environment
 * @property {string | number | RegExp | boolean | Environment} [key] - The value associated with the given key, which can be a string, number, regular expression, boolean, or another nested Environment object.
 */
export type Environment = {
    [key: string]: string | number | RegExp | boolean | Environment
}
/**
 * A utility type that creates a new type by mapping over the properties of a given type `T`.
 *
 * @template T - The type to be mapped.
 * @typedef {Object} DocType
 * @property {T[P]} [P] - The value of the property `P` in the new type, which is the same as the value of `P` in the original type `T`.
 */
export type DocType<T> = {
    [P in keyof T]: T[P];
}
/**
 * Represents an error response object with properties for the error name, message, and status code.
 *
 * @typedef {Object} ErrorResponse
 * @property {string} name - The name or type of the error.
 * @property {string} message - The error message describing the error.
 * @property {number} statusCode - The HTTP status code associated with the error.
 */
export type ErrorResponse = {
    name: string,
    message: string,
    statusCode: number
}
/**
 * Represents an asynchronous handler function that takes a Request, Response, and NextFunction objects as parameters and returns a Promise.
 *
 * @typedef {Function} AsyncHandler
 * @param {Request} req - The incoming HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function in the request-response cycle.
 * @returns {Promise<any>} A Promise that resolves with any value or rejects with an error.
 */
export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
/**
 * Represents an asynchronous function that can take any number of parameters and returns a Promise.
 *
 * @typedef {Function} AsyncFunctionHandler
 * @param {...any} params - An array of parameters of any type.
 * @returns {Promise<any>} A Promise that resolves with any value or rejects with an error.
 */
export type AsyncFunctionHandler = (...params: any) => Promise<any>;