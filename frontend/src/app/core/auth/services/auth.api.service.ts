import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import environment from "../../../environment";
import { CreateUser } from "../models/createUser";
import { User } from "../models/user";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private _http = inject(HttpClient);
    private readonly baseUrl = environment.api;

    login(email: string, password: string) {
        return this._http.post<User>(`${this.baseUrl}/auth/login`, { email, password });
    }

    signup(data : CreateUser) {
        return this._http.post<User>(`${this.baseUrl}/auth/signup`, data);
    }

    getCurrentUser(token : string) : Observable<User> {
        return this._http.get<User>(`${this.baseUrl}/auth/me?token=${token}`);
    }
}