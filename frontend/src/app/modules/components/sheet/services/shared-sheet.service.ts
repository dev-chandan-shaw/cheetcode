import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, of } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { IApiResponse } from "../../../../shared/models/api-response";
import { ISheet } from "../../../../shared/models/sheet";

@Injectable({
    providedIn: "root",
})
export class SharedSheetApiService {
    private _apiUrl = environment.apiUrl;
    private _sharedSheetEndpoint = `${this._apiUrl}/shared-sheet`;
    private _http: HttpClient = inject(HttpClient);

    joinSharedSheet(sheetLink: string) {
        return this._http.post<IApiResponse<ISheet>>(`${this._sharedSheetEndpoint}/join/${sheetLink}`, {}).pipe(
            map(response => {
                return response.data; // Assuming the response contains the sheet data
            })
        );
    }

    getAllSharedSheets() {
        return this._http.get<IApiResponse<ISheet[]>>(`${this._sharedSheetEndpoint}`).pipe(
            map(response => {
                return response.data; // Assuming the response contains an array of sheets
            })
        );
    }

}