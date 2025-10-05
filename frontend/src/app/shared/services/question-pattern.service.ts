import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { IApiResponse } from "../models/api-response";

export interface QuestionPattern {
    id: number;
    name: string;
}
@Injectable({
    providedIn: "root",
})
export class QuestionPatternService {
    private apiUrl = environment.apiUrl;
    private questionsEndpoint = `${this.apiUrl}/question-pattern`;

    private _http = inject(HttpClient);

    getAllQuestionPatterns(): Observable<QuestionPattern[]> {
        return this._http.get<IApiResponse<QuestionPattern[]>>(`${this.questionsEndpoint}`).pipe(
            map(response => response.data)
        );
    }

    createQuestionPattern(name: string) {
        const params = { name };
        return this._http.post(`${this.questionsEndpoint}`, {}, { params });
    }
}