import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../types/core.types";
import { Request, Response } from "express";
/**
 * A class that handles error responses in an application.
 * 
 * @method handleErrors: Handles errors by creating an error response object and sending it as a JSON response.
 * @method routeNotExist: Handles the case when a requested route does not exist.
 * @singleton
 */
export default class ErrorHandler {
    /**
     * The singleton instance of the ErrorHandler class.
     */
    public static instance: ErrorHandler;
    /**
     * The default error response object.
     * @private
     */
    private _errorResponse: ErrorResponse;
    /**
     * Creates an instance of the ErrorHandler class and initializes the default error response.
     */
    constructor() {
        ErrorHandler.instance = this;
        this._errorResponse = {
            name: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: `Something went wrong!`,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR
        }
    }
    /**
     * Handles errors by creating an error response object and sending it as a JSON response.
     *
     * @param {Request} req - The incoming HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @param {any} error - The error object to be handled.
     * @returns {Response} The HTTP response object with the error response sent as JSON.
     */
    handleErrors(req:Request,res:Response,error:any):Response{
        this._errorResponse={
            name:error.name??this._errorResponse.name,
            message:error.message??this._errorResponse.message,
            statusCode:error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR
        }
        return res.status(this._errorResponse.statusCode).json(this._errorResponse);
    }
    /**
     * Handles the case when a requested route does not exist.
     *
     * @param {Request} req - The incoming HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    routeNotExist(req:Request,res:Response):void{
        this._errorResponse={
            name:ReasonPhrases.NOT_FOUND,
            message:`${req.method} ${req.originalUrl} doesn't exist!`,
            statusCode:StatusCodes.NOT_FOUND
        }
        res.status(this._errorResponse.statusCode).json(this._errorResponse);
    }
}