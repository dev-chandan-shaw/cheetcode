import { inject, Injectable } from "@angular/core";
import { QuestionApiService } from "./question-api.service";
import { map, Observable } from "rxjs";
import { PageResponse } from "../../models/page-response";
import { IAddQuestionDto, IQuestion, IUnapprovedQuestion } from "../../models/interface";
import { IQuestionDataService } from "../../models/question-data";

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements IQuestionDataService {
    private _questionApiService: QuestionApiService = inject(QuestionApiService);
    private _lastRandomQuestion: IQuestion | null = null;

    getQuestions(page: number = 0, categoryId?: number | 'all') : Observable<PageResponse<IQuestion>> {
        return this._questionApiService.getQuestions(page, categoryId).pipe(
            map(response => response.data)
        );
    }

    addQuestion(question: IAddQuestionDto): Observable<IQuestion> {
        return this._questionApiService.addQuestion(question).pipe(
            map(response => response.data)
        );
    }

    getUnapprovedQuestions(page: number = 0): Observable<PageResponse<IUnapprovedQuestion>> {
        return this._questionApiService.getUnapprovedQuestions(page).pipe(
            map(response => response.data)
        );
    }

    approveQuestion(questionId: number): Observable<IQuestion> {
        return this._questionApiService.approveQuestion(questionId).pipe(
            map(response => response.data)
        );
    }

    archiveQuestion(questionId: number): Observable<IQuestion> {
        return this._questionApiService.archiveQuestion(questionId).pipe(
            map(response => response.data)
        );
    }

    pickRandom(categoryId: number | 'all' = 'all'): Observable<IQuestion> {
        return this._questionApiService.pickRandom(categoryId, this._lastRandomQuestion?.id).pipe(
            map(response => {
                this._lastRandomQuestion = response.data;
                return response.data;
            })
        );
    }
}