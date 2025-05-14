import { FilterQuery, ProjectionType, QueryOptions, UpdateAggregationStage, UpdateQuery } from "mongoose";
import { IConcept } from "../../interfaces/concept.interface";
/**
 * Abstraction of a generic repository for handling CRUD operations on documents of type T.
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
export default abstract class IRepository<T extends IConcept> {
    /**
     * Retrieves all documents based on the provided filter, projection, and query options.
     * 
     * @param {FilterQuery<T>} [filter] The filter to apply when retrieving documents.
     * @param {ProjectionType<T>} [project] The fields to include or exclude in the result documents.
     * @param {QueryOptions<T>} [options] The query options to customize the retrieval process.
     * @returns {Promise<Array<T>>} A promise that resolves to an array of documents matching the filter criteria.
     */
    abstract getAll(filter?: FilterQuery<T>, project?: ProjectionType<T>, options?: QueryOptions<T>): Promise<Array<T>>;
    /**
     * Asynchronously counts the documents based on the provided filter.
     * 
     * @param {FilterQuery<T>} [filter] The filter query to apply for counting documents.
     * @returns {Promise<number>} A promise that resolves to the number of documents that match the filter.
     */
    abstract countDocs(filter?: FilterQuery<T>): Promise<number>;
    /**
     * Retrieves a single document based on the provided filter, projection, and query options.
     * 
     * @param {FilterQuery<T>} [filter] The filter query to search for the document.
     * @param {ProjectionType<T>} [project] The project Optional projection to apply to the retrieved document.
     * @param {QueryOptions<T>} [options] The options Additional query options to customize the search.
     * @returns {Promise<T>} A promise that resolves to the retrieved document.
     */
    abstract get(filter: FilterQuery<T>, project?: ProjectionType<T>, options?: QueryOptions<T>): Promise<T>;
    /**
     * Asynchronously creates a new document.
     * 
     * @param {T} [doc] The document to be created.
     * @param {ProjectionType<T>} [project] The projection options for the document.
     * @param {QueryOptions<T>} [options] The query options for the creation operation.
     * @returns {Promise<T>} A Promise that resolves to the newly created document.
     */
    abstract create(doc: T, project?: ProjectionType<T>, options?: QueryOptions<T>): Promise<T>;
    /**
     * Asynchronously updates a document in the repository based on the provided filter, update, and options.
     * 
     * @param {FilterQuery<T>} [filter] The filter query to find the document to update.
     * @param {UpdateQuery<T> | UpdateAggregationStage} [update] The update aggregation stage or query to apply to the document.
     * @param {QueryOptions<T>} [options] The query options to customize the update operation.
     * @returns {Promise<T>} A promise that resolves to the updated document.
     */
    abstract update(filter: FilterQuery<T>, update: UpdateQuery<T> | UpdateAggregationStage, options: QueryOptions<T>): Promise<T>;
    /**
     * Asynchronously deletes a document based on the provided filter.
     * 
     * @param {FilterQuery<T>} [filter] - The filter query to identify the document to be deleted.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the document was successfully deleted.
     */
    abstract delete(filter: FilterQuery<T>): Promise<boolean>;
}