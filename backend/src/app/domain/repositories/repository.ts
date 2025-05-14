import { FilterQuery, Model, ProjectionType, QueryOptions, UpdateAggregationStage, UpdateQuery } from "mongoose";
import MongoQueryHelper from "../../../helpers/mongoQuery.helper";
import { IConcept } from "../interfaces/concept.interface";
import IRepository from "./abstracts/repository.abstract";

/**
 * Represents a generic repository for handling CRUD operations on documents of type T.
 * @template T - The type of the document.
 * 
 * @method getAll
 ** Retrieves all documents based on the provided filter, projection, and query options.
 * 
 * @method count
 ** Counts the number of documents that match the provided filter.
 *
 * @method get
 ** Retrieves a single document based on the provided filter, projection, and query options.
 *
 * @method create
 ** Creates a new document.
 *
 * @method update
 ** Updates one or more documents based on the provided filter and update query.
 *
 * @method delete
 ** Deletes one or more documents based on the provided filter.
 */
export default class Repository<T extends IConcept> implements IRepository<T> {
    private _queryHelper: MongoQueryHelper<T>;
    private _collection: Model<T>;
    private _projectionRule: ProjectionType<T>;
    private _queryOptions: QueryOptions<T>;
    /**
    * Creates a new instance of the Repository class.
    * @param {Model<T>} [collection] - The Mongoose model for the concept type.
    */
    constructor(collection: Model<T>, projectionRule?: ProjectionType<T>, queryOptions?: QueryOptions<T>) {
        this._collection = collection;
        this._projectionRule = projectionRule as ProjectionType<T>;
        this._queryOptions = queryOptions as QueryOptions<T>;
        this._queryHelper = new MongoQueryHelper(this._collection);
    }

    async getAll(filter?: FilterQuery<T>, project: ProjectionType<T> = this._projectionRule, options: QueryOptions<T> = this._queryOptions): Promise<Array<T>> {
        let docs: Array<T> = [];
        docs = await this._queryHelper.getDocuments(filter, project, options);
        return docs;
    }

    async countDocs(filter?: FilterQuery<T>): Promise<number> {
        let count: number = 0;
        count = await this._queryHelper.countDocuments(filter);
        return count;
    }

    async get(filter: FilterQuery<T>, project: ProjectionType<T> = this._projectionRule, options: QueryOptions<T> = this._queryOptions): Promise<T> {
        let doc: T = {} as T;
        doc = await this._queryHelper.getDocument(filter, project, options) ?? {} as T;
        return doc;
    }

    async create(doc: T, project: ProjectionType<T> = this._projectionRule, options: QueryOptions<T> = this._queryOptions): Promise<T> {
        let newDoc: T = {} as T;
        newDoc = await this._queryHelper.createDocument(doc, project, options) ?? {} as T;
        return newDoc;
    }

    async update(filter: FilterQuery<T>, update: UpdateAggregationStage | UpdateQuery<T>, options: QueryOptions<T> = this._queryOptions): Promise<T> {
        let doc: T = {} as T;
        doc = await this._queryHelper.updateDocument(filter, update, options);
        return doc;
    }

    async delete(filter: FilterQuery<T>): Promise<boolean> {
        let isDelete: boolean = false;
        isDelete = await this._queryHelper.deleteDocument(filter);
        return isDelete;
    }
}