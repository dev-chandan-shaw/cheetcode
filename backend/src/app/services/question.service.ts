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
  private repository: QuestionRepository = new QuestionRepository();
  constructor() {
    super(new QuestionRepository());
  }
  async getQuestionsByCategory(categoryId: string): Promise<IQuestion[]> {
    console.log("Category ID:", categoryId);

    if (!categoryId) {
      throw new Error("Category ID is required.");
    }

    const questions = await this.repository.findByCategoryId(categoryId);
    if (!questions || questions.length === 0) {
      throw new Error("No questions found for the given category.");
    }

    return questions;
  }
}
