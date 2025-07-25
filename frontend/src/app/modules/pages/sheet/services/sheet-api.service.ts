import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Sheet } from "../sheet";
import { IApiResponse } from "../../../../shared/models/api-response";
import { ISheet } from "../../../../shared/models/sheet";

@Injectable({
  providedIn: 'root'
})
export class SheetApiService {
    private apiUrl = environment.apiUrl;
    private sheetsEndpoint = `${this.apiUrl}/sheet`;
    private _http = inject(HttpClient);

    getAllSheets() {
        return this._http.get<IApiResponse<ISheet[]>>(this.sheetsEndpoint);
    }

    createSheet(title: string) {
        return this._http.post<IApiResponse<ISheet>>(`${this.sheetsEndpoint}?title=${title}`, { });
    }

    getSheetBySlug(slug: string) {
        return this._http.get<IApiResponse<ISheet>>(`${this.sheetsEndpoint}/slug/${slug}`);
    }

   
}