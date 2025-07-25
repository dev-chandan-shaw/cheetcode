import { inject, Injectable } from "@angular/core";
import { QuestionApiService } from "./question-api.service";
import { map, Observable } from "rxjs";
import { PageResponse } from "../../../../shared/models/page-response";
import { IQuestion } from "../../../../shared/models/interface";
import { IQuestionDataService } from "../../../../shared/models/question-data";

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements IQuestionDataService {
    private _questionApiService: QuestionApiService = inject(QuestionApiService);

    getQuestions(page: number = 0, categoryId?: number | 'all') : Observable<PageResponse<IQuestion>> {
        return this._questionApiService.getQuestions(page, categoryId).pipe(
            map(response => response.data)
        );
    }
}