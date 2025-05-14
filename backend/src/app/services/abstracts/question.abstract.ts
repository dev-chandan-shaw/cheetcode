import { ICategory } from "../../domain/interfaces/category.interface";
import { IQuestion } from "../../domain/interfaces/question.interface";
import IService from "./service.abstract";

export abstract class IQuestionService extends IService<IQuestion> {}
