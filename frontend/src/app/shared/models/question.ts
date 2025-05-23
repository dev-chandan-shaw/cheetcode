export interface Question {
  id: number;
  title: string;
  link: string;
  isBookmarked: boolean;
}

export interface IQuestionNote {
  id: number;
  question: Question;
  note: string;
}
