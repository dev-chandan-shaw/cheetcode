import { AnyBulkWriteOperation, FilterQuery, Model, MongooseBulkWriteOptions, ProjectionType, QueryOptions, UpdateAggregationStage, UpdateQuery } from "mongoose";
import { IConcept } from "../app/domain/interfaces/concept.interface";
import { BulkWriteResult, DeleteResult } from "../types/mongo.type";
/**
 * A helper class for performing common MongoDB query operations using Mongoose.
 *
 * @template T - The type of the document, which must extend the `IConcept` interface.
 * 
 * @method getDocuments 
 ** Retrieves documents from the database collection based on the provided filter, projection, and options.
 *
 * @method countDocuments
 ** Counts the number of documents in the database collection that match the provided filter.
 *
 * @method getDocument
 ** Retrieves a single document from the database collection based on the provided filter, projection, and options.
 *
 * @method createDocument
 ** Creates a new document in the database collection.
 *
 * @method updateDocument
 ** Updates documents in the database collection based on the provided filter and update query.
 *
 * @method deleteDocument
 ** Deletes documents from the database collection based on the provided filter.
 *
 * @method bulkWrite
 ** Performs a bulk write operation on the database collection.
 */
export default class MongoQueryHelper<T extends IConcept> {
    private _dbCollection: Model<T>;
    /**
     * Creates a new instance of the MongoQueryHelper class.
     *
     * @param {Model<T>} dbCollection - The Mongoose model representing the database collection.
     */
    constructor(dbCollection: Model<T>) {
        this._dbCollection = dbCollection;
    }
    /**
     * Retrieves documents from the database collection based on the provided filter, projection, and options.
     *
     * @template T - The type of the document.
     * @param {FilterQuery<T>} [filter] - The filter object used to select documents.
     * @param {ProjectionType<T>} [project] - The projection object used to specify which fields to include or exclude.
     * @param {QueryOptions<T>} [options] - The options object used to configure the query.
     * @param {number} [options.limit] - The maximum number of documents to return. Default 100.
     * @param {number} [options.skip] - The number of documents to skip before returning the result set. Default 0.
     * @returns {Promise<T[]>} A promise that resolves to an array of documents matching the query.
     */
    async getDocuments(filter?: FilterQuery<T>, project?: ProjectionType<T>, options?: QueryOptions<T>): Promise<T[]> {
        let docs: T[] = [];
        if (options == undefined)
            options = { limit: 100, skip: 0 };
        if (!options.limit)
            options.limit = 100;
        if (!options.skip)
            options.skip = 0;
        docs = await this._dbCollection.find(filter ?? {} as FilterQuery<T>, project, options) as T[];
        return docs;
    }
    /**
     * Counts the number of documents in the database collection that match the provided filter.
     *
     * @template T - The type of the document.
     * @param {FilterQuery<T>} [filter] - The filter object used to select the documents to count.
     * @returns {Promise<number>} A promise that resolves to the number of documents matching the filter.
     */
    async countDocuments(filter?: FilterQuery<T>): Promise<number> {
        let count: number = 0;
        count = await this._dbCollection.countDocuments(filter ?? {} as FilterQuery<T>)
        return count;
    }
    /**
     * Retrieves a single document from the database collection based on the provided filter, projection, and options.
     *
     * @template T - The type of the document.
     * @param {FilterQuery<T>} [filter] - The filter object used to select the document.
     * @param {ProjectionType<T>} [project] - The projection object used to specify which fields to include or exclude.
     * @param {QueryOptions<T>} [options] - The options object used to configure the query.
     * @returns {Promise<T>} A promise that resolves to the document matching the query, or an empty object if no document is found.
     */
    async getDocument(filter?: FilterQuery<T>, project?: ProjectionType<T>, options?: QueryOptions<T>): Promise<T> {
        let doc: T = {} as T;
        doc = await this._dbCollection.findOne(filter ?? {} as FilterQuery<T>, project, options) || {} as T;
        return doc;
    }
    /**
     * Creates a new document in the database collection.
     *
     * @template T - The type of the document.
     * @param {T} doc - The document object to be created.
     * @param {ProjectionType<T>} [project] - The projection object used to specify which fields to include or exclude in the returned document.
     * @param {QueryOptions<T>} [options] - The options object used to configure the query for retrieving the created document.
     * @returns {Promise<T>} A promise that resolves to the created document.
     */
    async createDocument(doc: T, project?: ProjectionType<T>, options?: QueryOptions<T>): Promise<T> {
        let newDoc: T = {} as T;
        newDoc = await this._dbCollection.create(doc) || {} as T;
        if (Object.keys(newDoc).length != 0)
            newDoc = await this.getDocument({ _id: newDoc._id }, project, options)
        return newDoc;
    }
    /**
     * Updates one or more documents in the database collection based on the provided filter and update operation.
     *
     * @template T - The type of the document.
     * @param {FilterQuery<T>} filter - The filter object used to select the documents to update.
     * @param {UpdateQuery<T> | UpdateAggregationStage} update - The update operation to be applied to the selected documents.
     * @param {QueryOptions<T>} [options] - The options object used to configure the update operation.
     * @param {boolean} [options.new=true] - If true, the method returns the updated document after the update is applied. If false, it returns the document as it was before the update.
     * @returns {Promise<T>} A promise that resolves to the updated document.
     */
    async updateDocument(filter: FilterQuery<T>, update: UpdateQuery<T> | UpdateAggregationStage, options?: QueryOptions<T>): Promise<T> {
        let doc: T = {} as T;
        if (options == undefined)
            options = { new: true };
        options.new = true;
        doc = await this._dbCollection.findOneAndUpdate(filter, update, options) as T;
        return doc;
    }
    /**
     * Deletes one document from the database collection based on the provided filter.
     *
     * @template T - The type of the document.
     * @param {FilterQuery<T>} filter - The filter object used to select the document to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if a document was deleted, or false otherwise.
     */
    async deleteDocument(filter: FilterQuery<T>): Promise<boolean> {
        let result: DeleteResult = {} as DeleteResult;
        result = await this._dbCollection.deleteOne(filter);
        return result.deletedCount > 0;
    }
    /**
     * Performs a bulk write operation on the database collection.
     *
     * @template T - The type of the document.
     * @param {Array<AnyBulkWriteOperation>} operations - An array of bulk write operations to be executed.
     * @param {MongooseBulkWriteOptions} [options] - The options object used to configure the bulk write operation.
     * @returns {Promise<BulkWriteResult>} A promise that resolves to the result of the bulk write operation.
     */
    async bulkWriteDocuments(operations: Array<AnyBulkWriteOperation>, options?: MongooseBulkWriteOptions): Promise<BulkWriteResult> {
        let result: BulkWriteResult = {} as BulkWriteResult;
        result = await this._dbCollection.bulkWrite(operations, options);
        return result;
    }
}