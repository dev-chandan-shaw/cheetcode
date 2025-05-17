import { Question } from "./question";

export interface Category {
  id: number;
  name: string;
  questions: Question[];
}
