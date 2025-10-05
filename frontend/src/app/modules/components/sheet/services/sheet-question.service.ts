import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { BaseQuestionService, Problem } from "../../../../shared/components/question-grid/question-grid";
import { map, Observable, of, throwError } from "rxjs";
import { IApiResponse } from "../../../../shared/models/api-response";
import { ISheetQuestion } from "../../../../shared/models/interface";
import { PageResponse } from "../../../../shared/models/page-response";
import { ISheet } from "../../../../shared/models/sheet";

@Injectable({
    providedIn: 'root'
})
export class SheetQuestionService implements BaseQuestionService {
    private apiUrl = environment.apiUrl;
    private sheetQuestionsEndpoint = `${this.apiUrl}/sheet-question`;
    private lastRandomQuestionId: number | null = null;
    private _http: HttpClient = inject(HttpClient);


    getQuestions(extraParams?: any): Observable<Problem[]> {
        const sheetId = extraParams?.sheetId;
        const sheetSlug = extraParams?.sheetSlug;
        if (sheetSlug) {
            return this.getQuestionBySheetSlug(sheetSlug);
        }
        if (sheetId) {
            return this.getQuestionBySheetId(sheetId);
        }

        return throwError(() => new Error('Either sheetId or sheetSlug must be provided'));
    }

    getQuestionBySheetId(sheetId: number): Observable<Problem[]> {
        const params = { sheetId: sheetId.toString() };
        return this._http.get<IApiResponse<Problem[]>>(`${this.sheetQuestionsEndpoint}/sheet`, { params }).pipe(map(response => response.data));
    }

    getQuestionBySheetSlug(sheetSlug: string): Observable<Problem[]> {
        const params = { slug: sheetSlug };
        return this._http.get<IApiResponse<Problem[]>>(`${this.sheetQuestionsEndpoint}/sheet`, { params }).pipe(map(response => response.data));
    }

    pickRandom(categoryId: number | 'all' = 'all', extraParams?: any): Observable<Problem> {
        let params = new HttpParams();
        if (extraParams?.sheetId) {
            params = params.set('sheetId', extraParams.sheetId.toString());
        }
        if (categoryId !== 'all') {
            params = params.set('categoryId', categoryId);
        }
        if (this.lastRandomQuestionId) {
            params = params.set('lastQuestionId', this.lastRandomQuestionId.toString());
        }
        const url = `${this.sheetQuestionsEndpoint}/random`;
        return this._http.get<IApiResponse<Problem>>(url, { params }).pipe(
            map(response => {
                this.lastRandomQuestionId = response.data.id;
                return response.data;
            })
        );
    }

    addQuestionToSheet(sheetId: number, questionId: number) {
        const request = { sheetId, questionId };
        return this._http.post<IApiResponse<ISheet>>(`${this.sheetQuestionsEndpoint}`, request);
    }


}