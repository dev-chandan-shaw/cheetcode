import { IQuestion } from "../interfaces/question.interface";
import Question from "../models/question.model";
import { IQuestionRepository } from "./abstracts/question.abstract";
import Repository from "./repository";

export class QuestionRepository
  extends Repository<IQuestion>
  implements IQuestionRepository
{
  constructor() {
    super(new Question().getCollection()); // Initialize the collection in the parent class
  }
  async findByCategoryId(categoryId: string): Promise<IQuestion[]> {
    return this._collection.find({ categoryId });
  }
}
