import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminApiService {
    private apiUrl = environment.apiUrl;
}