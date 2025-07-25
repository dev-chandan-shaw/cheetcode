export interface ISheet {
    id: number;
    title: string;
    slug: string;
}

export interface IAddQuestionToSheetRequest {
    questionId: number;
    sheetId: number;
}