import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, of } from "rxjs";
import { IApiResponse } from "../models/api-response";
import { ISheet } from "../models/sheet";

@Injectable({
  providedIn: "root",
})
export class SharedSheetApiService {
    private _apiUrl = environment.apiUrl;
    private _sharedSheetEndpoint = `${this._apiUrl}/shared-sheet`;
    private _http: HttpClient = inject(HttpClient);
    private _sharedSheets: ISheet[] | undefined = undefined;

    joinSharedSheet(sheetLink: string) {

        return this._http.post<IApiResponse<ISheet>>(`${this._sharedSheetEndpoint}/join/${sheetLink}`, { }).pipe(
            map(response => {
                this._sharedSheets?.push(response.data); // Add the joined sheet to the cached shared sheets
                return response.data; // Assuming the response contains the sheet data
            })
        );
    }

    getAllSharedSheets() {
        if (this._sharedSheets) {
            return of(this._sharedSheets); // emits cached value
        }
        return this._http.get<IApiResponse<ISheet[]>>(`${this._sharedSheetEndpoint}`).pipe(
            map(response => {
                this._sharedSheets = response.data; // cache the result
                return response.data; // Assuming the response contains an array of sheets
            })
        );
    }

}