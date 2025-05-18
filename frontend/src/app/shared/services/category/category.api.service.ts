import { inject, Injectable } from "@angular/core";
import environment from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Category } from "../../models/category";

@Injectable({
    providedIn: "root",
})
export class CategoryApiService {
    private readonly _baseUrl = environment.api;
    private _http = inject(HttpClient);

    getCategories() {
        return this._http.get<Category[]>(`${this._baseUrl}/category`);
    }

    addCategory(name: string) {
        return this._http.post(`${this._baseUrl}/category?name=${name}`, { });
    }
}