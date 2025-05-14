import { Model, Schema, model, models } from "mongoose";
import { IQuestion } from "../interfaces/question.interface";
/**
 * class using IQuestion and representing the user model
 * @method getCollection() - to retrieve the user model schema
 * @returns {Model<IQuestion>}
 */
export default class Question {
  private _collectionName: string = "Question";
  private _schema: Schema = new Schema<IQuestion>({
    title: { type: String, required: true },
    link: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  });
  public getCollection(): Model<IQuestion> {
    return (
      models.Question || model<IQuestion>(this._collectionName, this._schema)
    );
  }
}
