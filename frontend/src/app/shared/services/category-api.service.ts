import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ICategory } from "../models/category";
import { IApiResponse } from "../models/api-response";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  private apiUrl = environment.apiUrl;
  private questionsEndpoint = `${this.apiUrl}/category`;

  private _http = inject(HttpClient);

  private _categories: Observable<IApiResponse<ICategory[]>> | null = null;

  getCategories(): Observable<IApiResponse<ICategory[]>> {
    if (this._categories) {
      return this._categories;
    }
    this._categories = this._http.get<IApiResponse<ICategory[]>>(this.questionsEndpoint).pipe(map(res => {
      return res;
    }));
    return this._categories;
  }

  createCategory(name: string): Observable<IApiResponse<ICategory>> {
    const params = new HttpParams();
    params.set('name', name);
    return this._http.post<IApiResponse<ICategory>>(this.questionsEndpoint, {}, { params });
  }

  updateCategory(id: number, name: string): Observable<IApiResponse<ICategory>> {
    const params = new HttpParams();
    params.set('name', name);
    return this._http.put<IApiResponse<ICategory>>(`${this.questionsEndpoint}/${id}`, {}, { params });
  }
}