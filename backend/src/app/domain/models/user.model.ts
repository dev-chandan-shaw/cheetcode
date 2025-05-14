import mongoose, { Model, Schema, model, models } from "mongoose";
import { IUser } from "../interfaces/user.interface";
/**
 * class using IUser and representing the user model
 * @method getCollection() - to retrieve the user model schema
 * @returns {Model<IUser>}
 */
export default class User {
  private _collectionName: string = "User";
  private _schema: Schema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  });
  public getCollection(): Model<IUser> {
    return models.User || model<IUser>(this._collectionName, this._schema);
  }
}
