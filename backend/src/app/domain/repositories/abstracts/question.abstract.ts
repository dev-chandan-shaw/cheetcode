import { IQuestion } from "../../interfaces/question.interface";
import IRepository from "./repository.abstract";

export abstract class IQuestionRepository extends IRepository<IQuestion> {
  abstract findByCategoryId(categoryId: string): Promise<IQuestion[]>;
}
