import { ICategory } from "../domain/interfaces/category.interface";
import { IQuestion } from "../domain/interfaces/question.interface";
import { CategoryRepository } from "../domain/repositories/category.repository";
import { QuestionRepository } from "../domain/repositories/question.repository";
import { ICategoryService } from "./abstracts/category.abstract";
import { IQuestionService } from "./abstracts/question.abstract";
import Service from "./service";

export class QuestionService
  extends Service<IQuestion, QuestionRepository>
  implements IQuestionService
{
  constructor() {
    super(new QuestionRepository());
  }
}
