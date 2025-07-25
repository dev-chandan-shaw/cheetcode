import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IApiResponse } from "../models/api-response";
import { IUserQuestionStatus, UserQuestionStatusDto } from "../models/question-status";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class QuestionStatusApiService {
    private _apriUrl = environment.apiUrl;
    private _questionStatusEndpoint = `${this._apriUrl}/user-question-status`;
    private _http: HttpClient = inject(HttpClient);

    getAllQuestionStatuses() {
        return this._http.get<IApiResponse<IUserQuestionStatus[]>>(`${this._questionStatusEndpoint}`);
    }

    updateQuestionStatus(status: UserQuestionStatusDto): Observable<IApiResponse<null>> {
        return this._http.patch<IApiResponse<null>>(`${this._questionStatusEndpoint}`, status);
    }
}