import { FilterQuery, PopulateOptions } from "mongoose";
import { DocType } from "../../types/core.types";
import { IConcept } from "../domain/interfaces/concept.interface";
import IRepository from "../domain/repositories/abstracts/repository.abstract";
import IService from "./abstracts/service.abstract";
import validateObjectId from "../../validators/objectId.validator";
import { BadRequestError, NotFoundError } from "../../helpers/error.helper";

/**
 * A service class that provides CRUD operations for a specific concept type `T` and repository type `R`.
 *
 * @template T - The type of the concept that extends `IConcept` interface.
 * @template R - The type of the repository that extends `IRepository<T>` interface.
 * @implements {IService<T>} - Implements the `IService<T>` interface.
 *
 * @private
 * @method processFilter
 ** Processes the provided filter object and sets the query property accordingly.
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
export default class Service<T extends IConcept, R extends IRepository<T>>
  implements IService<T>
{
  private _repository: R;
  private _query: FilterQuery<T>;
  private _populate: string | string[];
  /**
   * Creates a new instance of the `Service` class.
   *
   * @param {R} repository - The repository instance of type `R`.
   * @param {PopulateOptions} [populate] - The optional populate options.
   */
  constructor(repository: R, populate?: string | string[]) {
    this._repository = repository;
    this._query = {} as FilterQuery<T>;
    this._populate = populate ?? [];
  }
  /**
   * Processes the provided filter object and sets the `_query` property accordingly.
   *
   * @param {DocType<T>} [filter] - An optional filter object of type `DocType<T>`.
   * @returns {Promise<void>} A Promise that resolves when the filter processing is complete.
   * @private
   */
  private async processFilter(filter?: DocType<T>): Promise<void> {
    if (filter) {
      const { id, ...restFilter } = filter;
      if (id) {
        await validateObjectId(id);
        this._query = { ...restFilter, _id: id } as FilterQuery<T>;
      } else this._query = restFilter as FilterQuery<T>;
    }
  }
  async getAll(
    filter?: DocType<T>,
    page: number = 0,
    limit: number = 0
  ): Promise<Array<T>> {
    let docs: Array<T> = [];
    await this.processFilter(filter);
    docs = await this._repository.getAll(
      this._query,
      {},
      { populate: this._populate, limit: limit, skip: limit * page }
    );
    return docs;
  }
  async get(filter: DocType<T>): Promise<T> {
    let doc: T = {} as T;
    await this.processFilter(filter);
    doc = await this._repository.get(
      this._query,
      {},
      { populate: this._populate }
    );
    if (Object.keys(doc).length == 0)
      throw new NotFoundError(`No document found!`);
    return doc;
  }
  async create(doc: DocType<T>): Promise<T> {
    let newDoc: T = {} as T;
    newDoc =
      (await this._repository.create(doc, {}, { populate: this._populate })) ||
      ({} as T);
    if (Object.keys(newDoc).length == 0)
      throw new BadRequestError(`Unable to insert!`);
    return newDoc;
  }
  async update(filter: DocType<T>, update: DocType<T>): Promise<T> {
    let updatedDoc: T = {} as T;
    await this.processFilter(filter);
    updatedDoc =
      (await this._repository.update(this._query, update, {
        populate: this._populate,
      })) || ({} as T);
    if (Object.keys(updatedDoc).length == 0)
      throw new NotFoundError(`No document found to update!`);
    return updatedDoc;
  }
  async delete(filter: DocType<T>): Promise<boolean> {
    let isDelete: boolean = false;
    await this.processFilter(filter);
    isDelete = await this._repository.delete(this._query);
    if (!isDelete) throw new BadRequestError(`Unable to delete the document!`);
    return isDelete;
  }
}
