import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IApiResponse } from "../../../shared/models/api-response";
import { IUser } from "../../../shared/models/user";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private _apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);
  private _route = inject(ActivatedRoute);
  login(username: string, password: string) {
    return this._http.post<IApiResponse<IUser>>(`${this._apiUrl}/auth/login`, { email: username, password });
  }

  fetchCurrentUser(token: string) {
    return this._http.get<IApiResponse<IUser>>(`${this._apiUrl}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}