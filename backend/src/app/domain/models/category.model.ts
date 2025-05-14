import mongoose, { Model, Schema, model, models } from "mongoose";
import { ICategory } from "../interfaces/category.interface";
/**
 * class using ICategory and representing the user model
 * @method getCollection() - to retrieve the user model schema
 * @returns {Model<ICategory>}
 */
export default class Category {
  private _collectionName: string = "Category";
  private _schema: Schema = new Schema<ICategory>({
    name: { type: String, required: true },
  });
  public getCollection(): Model<ICategory> {
    return (
      models.Category || model<ICategory>(this._collectionName, this._schema)
    );
  }
}
