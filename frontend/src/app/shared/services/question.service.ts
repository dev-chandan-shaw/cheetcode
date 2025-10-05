import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseQuestionService, Problem } from "../components/question-grid/question-grid";
import { map, Observable } from "rxjs";
import { PageResponse } from "../models/page-response";
import { IApiResponse } from "../models/api-response";
import { IAddQuestionDto, IUnapprovedQuestion } from "../models/interface";

@Injectable({
    providedIn: 'root'
})
export class QuestionService implements BaseQuestionService {
    private readonly _http = inject(HttpClient);
    private readonly _apiUrl = environment.apiUrl;
    private readonly questionsEndpoint = `${this._apiUrl}/question`;
    private lastRandomQuestion: Problem | null = null;

    getQuestions(): Observable<Problem[]> {
        return this._http.get<IApiResponse<Problem[]>>(`${this._apiUrl}/question`).pipe(map(response => response.data));
    }

    addQuestion(question: IAddQuestionDto): Observable<IApiResponse<Problem>> {
        return this._http.post<IApiResponse<Problem>>(this.questionsEndpoint, question);
    }

    updateQuestion(questionId: number, question: Partial<IAddQuestionDto>): Observable<IApiResponse<Problem>> {
        const url = `${this.questionsEndpoint}/${questionId}`;
        return this._http.put<IApiResponse<Problem>>(url, question);
    }

    approveQuestion(questionId: number): Observable<IApiResponse<Problem>> {
        const url = `${this.questionsEndpoint}/approve/${questionId}`;
        return this._http.put<IApiResponse<Problem>>(url, {});
    }

    getUnapprovedQuestions(page: number = 0): Observable<IApiResponse<PageResponse<IUnapprovedQuestion>>> {
        const url = `${this.questionsEndpoint}/unapproved`;
        let params = new HttpParams().set('page', page.toString());
        return this._http.get<IApiResponse<PageResponse<IUnapprovedQuestion>>>(url, { params });
    }

    archiveQuestion(questionId: number): Observable<IApiResponse<Problem>> {
        const url = `${this.questionsEndpoint}/archive/${questionId}`;
        return this._http.put<IApiResponse<Problem>>(url, {});
    }


    pickRandom(categoryId: number | "all" = "all"): Observable<Problem> {
        let params = new HttpParams();
        if (categoryId !== 'all') {
            params = params.set('categoryId', categoryId);
        }
        if (this.lastRandomQuestion) {
            params = params.set('lastQuestionId', this.lastRandomQuestion.id.toString());
        }
        const url = `${this.questionsEndpoint}/random`;
        return this._http.get<IApiResponse<Problem>>(url, { params }).pipe(
            map(response => {
                this.lastRandomQuestion = response.data;
                return response.data;
            })
        );
    }
}