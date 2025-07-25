export interface IQuestion {
    id: number;
    title: string;
    link: string;
    difficulty: QuestionDifficulty;
}

export interface IQuestionList {
    questions: IQuestion[];
    total: number;
}

export interface IQuestionFilter {
    difficulty?: string;
    searchTerm?: string;
}

export enum QuestionDifficulty {
    Easy = "EASY",
    Medium = "MED",
    Hard = "HARD"
}


export interface ISheetQuestion {
    id: number;
    question: IQuestion;
}