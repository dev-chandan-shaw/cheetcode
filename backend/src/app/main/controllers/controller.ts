import { Request, Response } from "express";
import AsyncUtils from "../../../utils/async.utils";
import { IConcept } from "../../domain/interfaces/concept.interface";
import IService from "../../services/abstracts/service.abstract";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * A generic controller class that handles CRUD operations for a specific concept and service.
 *
 * @template T - The type of the concept that extends the `IConcept` interface.
 * @template S - The type of the service that extends the `IService<T>` interface.
 * 
 * @method getDocuments: Retrieves all documents of type `T`.
 * @method getDocument: Retrieves a single document of type `T`.
 * @method createDocument: Creates a new document of type `T`.
 * @method updateDocument: Updates an existing document of type `T`.
 * @method deleteDocument: Deletes an existing document of type `T`.
 */
export default class Controller<T extends IConcept, S extends IService<T>> {
    /**
     * The service instance used by the controller.
     * @private
     */
    private _service: S;
    /**
     * An instance of the AsyncUtils class for handling asynchronous operations.
     * @private
     */
    private _asyncUtils: AsyncUtils;
    /**
     * Creates an instance of the Controller class.
     *
     * @param {S} service - The service instance to be used by the controller.
     */
    constructor(service: S) {
        this._service = service;
        this._asyncUtils = new AsyncUtils();
    }
    /**
     * Retrieves all documents of type `T`.
     *
     * @param {Request} req - The incoming HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A Promise that resolves after sending the response.
     */
    public async getDocuments(req: Request, res: Response): Promise<void> {
        let docs: Array<T> = [];
        docs = await this._asyncUtils.wrapFunction(this._service.getAll.bind(this._service), [req.query]);
        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            error: null,
            count: docs.length,
            data: docs
        });
    }
    /**
     * Retrieves a single document of type `T`.
     *
     * @param {Request} req - The incoming HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A Promise that resolves after sending the response.
     */
    public async getDocument(req: Request, res: Response): Promise<void> {
        let doc: T = {} as T;
        if (req.params)
            doc = await this._asyncUtils.wrapFunction(this._service.get.bind(this._service), [req.params]);
        else
            doc = await this._asyncUtils.wrapFunction(this._service.get.bind(this._service), [req.query]);
        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            error: null,
            data: doc
        });
    }
    /**
     * Creates a new document of type `T`.
     *
     * @param {Request} req - The incoming HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A Promise that resolves after sending the response.
     */
    public async createDocument(req: Request, res: Response): Promise<void> {
        let doc: T = {} as T;
        doc = await this._asyncUtils.wrapFunction(this._service.create.bind(this._service), [req.body]);
        res.status(StatusCodes.CREATED).json({
            status: ReasonPhrases.CREATED,
            error: null,
            data: doc
        });
    }
    /**
    * Updates an existing document of type `T`.
    *
    * @param {Request} req - The incoming HTTP request object.
    * @param {Response} res - The HTTP response object.
    * @returns {Promise<void>} A Promise that resolves after sending the response.
    */
    public async updateDocument(req: Request, res: Response): Promise<void> {
        let doc: T = {} as T;
        if (req.params)
            doc = await this._asyncUtils.wrapFunction(this._service.update.bind(this._service), [req.params, req.body]);
        else
            doc = await this._asyncUtils.wrapFunction(this._service.update.bind(this._service), [req.query, req.body]);
        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            error: null,
            data: doc
        });
    }
    /**
     * Deletes an existing document of type `T`.
     *
     * @param {Request} req - The incoming HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A Promise that resolves after sending the response.
     */
    public async deleteDocument(req: Request, res: Response): Promise<void> {
        if (req.params)
            await this._asyncUtils.wrapFunction(this._service.delete.bind(this._service), [req.params]);
        else
            await this._asyncUtils.wrapFunction(this._service.delete.bind(this._service), [req.query]);
        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            error: null,
            data: null
        });
    }
}