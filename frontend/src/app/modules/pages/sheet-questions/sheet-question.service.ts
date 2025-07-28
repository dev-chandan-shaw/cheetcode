import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { IQuestion, ISheetQuestion } from "../../../shared/models/interface";
import { IApiResponse } from "../../../shared/models/api-response";
import { PageResponse } from "../../../shared/models/page-response";
import { IQuestionDataService } from "../../../shared/models/question-data";
import { ISheet } from "../../../shared/models/sheet";

@Injectable({
    providedIn: 'root'
})

export class SheetQuestionService implements IQuestionDataService {
    private apiUrl = environment.apiUrl;
    private sheetQuestionsEndpoint = `${this.apiUrl}/sheet-question`;

    private _http: HttpClient = inject(HttpClient);

    getQuestions(page: number, categoryId: number | 'all', extraParams?: { sheetId: number }): Observable<PageResponse<IQuestion>> {
        // Implement the method to fetch questions based on page and categoryId

        let params = new HttpParams().set('page', page.toString());

        if (categoryId !== 'all') {
            params = params.set('categoryId', categoryId.toString());
        }
        return this._http.get<IApiResponse<PageResponse<ISheetQuestion>>>(`${this.sheetQuestionsEndpoint}/sheet/${extraParams?.sheetId}`, {
            params: params
        }).pipe(

            map(response => {
                const sheetQuestions = response.data.content;
                const questions: IQuestion[] = sheetQuestions.map(sheetQuestion => sheetQuestion.question);
                return {
                    content: questions,
                    pageNumber: response.data.pageNumber,
                    pageSize: response.data.pageSize,
                    totalElements: response.data.totalElements,
                    totalPages: response.data.totalPages,
                    hasMore: response.data.hasMore
                };
            })
        );
    }

    addQuestionToSheet(sheetId: number, questionId: number) {
        const request = { sheetId, questionId };
        return this._http.post<IApiResponse<ISheet>>(`${this.sheetQuestionsEndpoint}`, request);
    }

    pickRandom(categoryId?: number | "all"): Observable<IQuestion> {
        return this._http.get<IApiResponse<IQuestion>>(`${this.sheetQuestionsEndpoint}/random`, {
            params: new HttpParams().set('categoryId', categoryId?.toString() || 'all')
        }).pipe(
            map(response => response.data)
        );
    }

    

}