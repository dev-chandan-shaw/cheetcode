import * as express from "express";
import { ErrorStream, SuccessStream } from "../utils/log.utils";
import ErrorHandler from "../middlewares/error.middleware";
import AppRoute from "./main";
import { StatusCodes } from "http-status-codes";
import logger from "morgan";
import cors from "cors";

/**
 * The main application class that initializes and configures the Express app.
 */
export default class App {
    /**
     * The Express application instance.
     */
    public app: express.Express;
    /**
     * An instance of the SuccessStream class for logging success messages.
     * @private
     */
    private _successStream: SuccessStream;
     /**
     * An instance of the ErrorStream class for logging error messages.
     * @private
     */
    private _errorStream: ErrorStream;
    /**
     * An instance of the ErrorHandler class for handling errors.
     * @private
     */
    private _errorHandler: ErrorHandler;
    /**
     * An instance of the AppRoute class for managing application routes.
     * @private
     */
    private _appRoutes: AppRoute;
    /**
     * Creates an instance of the App class and initializes the Express app and other dependencies.
     */
    constructor() {
        this.app = express.default();
        this._successStream = new SuccessStream();
        this._errorStream = new ErrorStream();
        this._errorHandler = new ErrorHandler();
        this._appRoutes = new AppRoute();
        this.init();
    }
    /**
     * Initializes the Express app with middleware, routes, and error handling.
     * @private
     */
    private init(): void {
        this.app.use(logger("combined",{
            skip:this.filterSuccessResponse,
            stream:this._successStream
        }));
        this.app.use(logger("combined",{
            skip:this.filterErrorResponse,
            stream:this._errorStream
        }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/',this._appRoutes.routes);
        this.app.use(this._errorHandler.routeNotExist.bind(this._errorHandler));
        this.app.use(this._errorHandler.handleErrors.bind(this._errorHandler));
    }
    /**
     * Filters out success responses (status codes < 400) from being logged.
     *
     * @param {express.Request} req - The incoming HTTP request object.
     * @param {express.Response} res - The HTTP response object.
     * @returns {boolean} True if the response status code is less than 400, false otherwise.
     * @private
     */
    private filterSuccessResponse(req: express.Request, res: express.Response): boolean {
        return res.statusCode < StatusCodes.BAD_REQUEST;
    }
    /**
     * Filters out error responses (status codes >= 400) from being logged.
     *
     * @param {express.Request} req - The incoming HTTP request object.
     * @param {express.Response} res - The HTTP response object.
     * @returns {boolean} True if the response status code is greater than or equal to 400, false otherwise.
     * @private
     */
    private filterErrorResponse(req: express.Request, res: express.Response): boolean{
        return res.statusCode >= StatusCodes.BAD_REQUEST;
    }
}