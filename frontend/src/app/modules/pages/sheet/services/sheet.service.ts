import { inject, Injectable } from "@angular/core";
import { SheetApiService } from "./sheet-api.service";
import { map, Observable, of } from "rxjs";
import { ISheet } from "../../../../shared/models/sheet";

@Injectable({
  providedIn: 'root'
})
export class SheetService {
    private _sheetApiService = inject(SheetApiService);
    private _sheets: ISheet[] | undefined = undefined;

    getAllSheets() {
        if (this._sheets) {
            return of(this._sheets); // emits cached value
        }
        return this._sheetApiService.getAllSheets().pipe(
            map(response => {
                this._sheets = response.data; // cache the sheets
                return response.data;
            })
        )
    }

    createSheet(title: string) {
        return this._sheetApiService.createSheet(title).pipe(
            map(response => {
                return response.data;
            })
        );
    }

    getSheetBySlug(slug: string) : Observable<ISheet> {
        return this._sheetApiService.getSheetBySlug(slug).pipe(
            map(response => {
                return response.data;
            })
        );
    }

    
}