import { Observable } from "rxjs";
import { IQuestion } from "./interface";
import { PageResponse } from "./page-response";

export interface IQuestionDataService {
    getQuestions(page: number, categoryId: number | 'all', extraParams?: any): Observable<PageResponse<IQuestion>>;
}