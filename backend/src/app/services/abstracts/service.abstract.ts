import { DocType } from "../../../types/core.types";
import { IConcept } from "../../domain/interfaces/concept.interface";
/**
 * Abstract class representing a service for handling documents of a specific concept type.
 * Provides methods for retrieving, creating, updating, and deleting documents.
 *
 * @template T - The type of concept handled by this service.
 * 
 * @method getAll
 ** Retrieves all documents matching the specified filter, with optional pagination.
 *
 * @method get
 ** Retrieves a single document matching the specified filter.
 *
 * @method create
 ** Creates a new document based on the provided data.
 *
 * @method update
 ** Updates a document matching the specified filter with the provided update data.
 *
 * @method delete
 ** Deletes a document matching the specified filter.
 */
export default abstract class IService<T extends IConcept> {
    /**
     * Retrieves all documents matching the specified filter, with optional pagination.
     *
     * @param {DocType<T>} [filter] - An optional filter object to apply to the query.
     * @param {number} [page=0] - The page number for pagination (zero-based indexing). Defaults to 0.
     * @param {number} [limit=0] - The maximum number of documents to retrieve per page. Defaults to 0 (no limit).
     * @returns {Promise<Array<T>>} A Promise that resolves with an array of documents.
     */
    abstract getAll(filter?: DocType<T>, page?: number, limit?: number): Promise<Array<T>>;
    /**
     * Retrieves a single document matching the specified filter.
     *
     * @param {DocType<T>} filter - The filter object to apply to the query.
     * @returns {Promise<T>} A Promise that resolves with the retrieved document.
     * @throws {NotFoundError} If no document is found matching the specified filter.
     */
    abstract get(filter: DocType<T>): Promise<T>;
    /**
     * Creates a new document based on the provided data.
     *
     * @param {DocType<T>} doc - The data object to create the new document from.
     * @returns {Promise<T>} A Promise that resolves with the newly created document.
     * @throws {BadRequestError} If the creation process fails and no document is inserted.
     */
    abstract create(doc: DocType<T>): Promise<T>;
    /**
     * Update document matching the specified filter with the provided update data.
     *
     * @param {DocType<T>} filter - The filter object to select the documents to update.
     * @param {DocType<T>} update - The update data object containing the new values.
     * @returns {Promise<T>} A Promise that resolves with the updated document.
     * @throws {NotFoundError} If no document is found matching the specified filter.
     */
    abstract update(filter: DocType<T>, update: DocType<T>): Promise<T>;
    /**
     * Deletes a document from the repository based on the provided filter.
     *
     * @param {DocType<T>} filter - The filter object used to identify the document to delete.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the deletion was successful or not.
     * @throws {BadRequestError} If the deletion operation fails, a BadRequestError is thrown with the message "Unable to delete the document!".
     */
    abstract delete(filter: DocType<T>): Promise<boolean>;
}