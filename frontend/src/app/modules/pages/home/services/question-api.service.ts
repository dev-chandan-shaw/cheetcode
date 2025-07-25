import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IQuestion, IQuestionList } from "../../../../shared/models/interface";
import { IApiResponse } from "../../../../shared/models/api-response";
import { PageResponse } from "../../../../shared/models/page-response";

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
}