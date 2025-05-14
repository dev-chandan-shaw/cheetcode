import { IQuestion } from "../../domain/interfaces/question.interface";
import { QuestionService } from "../../services/question.service";
import Controller from "./controller";

export class QuestionController extends Controller<IQuestion, QuestionService> {
  constructor() {
    super(new QuestionService());
  }

  public async getQuestionsByCategory(req: any, res: any) {
    const category = req.params.id;

    try {
      const questions = await this._service.getQuestionsByCategory(category);
      res.status(200).json(questions);
    } catch (error: any) {
      res.status(500).json({ error: error?.message ?? "Something went wrong" });
    }
  }
}
