import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IAddQuestionDto, IQuestion, IQuestionList, IUnapprovedQuestion } from "../../models/interface";
import { IApiResponse } from "../../models/api-response";
import { PageResponse } from "../../models/page-response";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {
  private apiUrl = environment.apiUrl;
  private questionsEndpoint = `${this.apiUrl}/question`;
  private _http: HttpClient = inject(HttpClient);


  getQuestions(page: number = 0, categoryId: number | 'all' = 'all'  ) {
    let params = new HttpParams().set('page', page.toString());

    if (categoryId !== 'all' ) {
      params = params.set('categoryId', categoryId.toString());
    }

    return this._http.get<IApiResponse<PageResponse<IQuestion>>>(this.questionsEndpoint, { params });
  }

  addQuestion(question: IAddQuestionDto): Observable<IApiResponse<IQuestion>> {
      return this._http.post<IApiResponse<IQuestion>>(this.questionsEndpoint, question);
  }

  approveQuestion(questionId: number): Observable<IApiResponse<IQuestion>> {
      const url = `${this.questionsEndpoint}/approve/${questionId}`;
      return this._http.put<IApiResponse<IQuestion>>(url, {});
  }

  getUnapprovedQuestions(page: number = 0): Observable<IApiResponse<PageResponse<IUnapprovedQuestion>>> {
      const url = `${this.questionsEndpoint}/unapproved`;
      let params = new HttpParams().set('page', page.toString());
      return this._http.get<IApiResponse<PageResponse<IUnapprovedQuestion>>>(url, { params });
  }

  archiveQuestion(questionId: number): Observable<IApiResponse<IQuestion>> {
      const url = `${this.questionsEndpoint}/archive/${questionId}`;
      return this._http.put<IApiResponse<IQuestion>>(url, {});
  }

  pickRandom(categoryId: number | 'all' = 'all', lastQuestionId?: number): Observable<IApiResponse<IQuestion>> {
      let params = new HttpParams();
      if (categoryId !== 'all') {
          params = params.set('categoryId', categoryId.toString());
      }
      if (lastQuestionId) {
          params = params.set('lastQuestionId', lastQuestionId.toString());
      }
      const url = `${this.questionsEndpoint}/random`;
      return this._http.get<IApiResponse<IQuestion>>(url, { params });
  }
}