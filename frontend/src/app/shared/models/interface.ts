import { Problem } from "../components/question-grid/question-grid";

export interface IQuestion {
    id: number;
    title: string;
    link: string;
    difficulty: QuestionDifficulty;
}

export interface IAddQuestionDto {
    title: string;
    link: string;
    categoryId: number;
    difficulty: QuestionDifficulty;
    sheetId: number;
    questionPatternId?: number;
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
    question: Problem;
}

export interface IUnapprovedQuestion {
    id: number;
    title: string;
    link: string;
    difficulty: QuestionDifficulty;
    category: string;
}

export type TagSeverity = 'success' | 'warn' | 'danger' | 'info' | 'contrast' | undefined | null;