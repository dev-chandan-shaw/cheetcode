import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { environment } from "../../../../../environments/environment";
import { IApiResponse } from "../../../../shared/models/api-response";
import { ISheet } from "../../../../shared/models/sheet";

@Injectable({
    providedIn: 'root'
})
export class SheetService {
    private apiUrl = environment.apiUrl;
    private sheetsEndpoint = `${this.apiUrl}/sheet`;
    private _http = inject(HttpClient);

    getAllSheets() {
        return this._http.get<IApiResponse<ISheet[]>>(this.sheetsEndpoint).pipe(
            map(response => response.data)
        );
    }

    createSheet(title: string) {
        return this._http.post<IApiResponse<ISheet>>(`${this.sheetsEndpoint}?title=${title}`, {}).pipe(
            map(response => response.data)
        );
    }

    getSheetBySlug(slug: string) {
        return this._http.get<IApiResponse<ISheet>>(`${this.sheetsEndpoint}/slug/${slug}`).pipe(
            map(response => response.data)
        );
    }

    getAllSharedSheets() {
        return this._http.get<IApiResponse<ISheet[]>>(`${this.sheetsEndpoint}/shared`).pipe(
            map(response => response.data)
        );
    }
}