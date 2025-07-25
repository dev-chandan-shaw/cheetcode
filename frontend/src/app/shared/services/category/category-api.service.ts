import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IApiResponse } from "../../models/api-response";
import { ICategory } from "../../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
    private apiUrl = environment.apiUrl;
    private questionsEndpoint = `${this.apiUrl}/category`;

    private _http = inject(HttpClient);

    getCategories() {
        return this._http.get<IApiResponse<ICategory[]>>(this.questionsEndpoint);
    }


}