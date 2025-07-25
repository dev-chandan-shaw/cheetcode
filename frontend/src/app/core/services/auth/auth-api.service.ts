import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IApiResponse } from "../../../shared/models/api-response";
import { IUser } from "../../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
   private _apiUrl = environment.apiUrl;
   private _http = inject(HttpClient);
    login(username: string, password: string) {
        return this._http.post<IApiResponse<IUser>>(`${this._apiUrl}/auth/login`, { email: username, password });
    }

}