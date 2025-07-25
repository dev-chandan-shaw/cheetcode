import { inject, Injectable } from "@angular/core";
import { AuthApiService } from "./auth-api.service";
import { map, Observable } from "rxjs";
import { IUser } from "../../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private _authApiService = inject(AuthApiService);

    setUser(user: IUser): void {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }
    login(username: string, password: string) : Observable<IUser> {
        return this._authApiService.login(username, password).pipe(
            map(response => response.data)
        );
    }

    fetchCurrentUser(token: string) : Observable<IUser> {
        return this._authApiService.fetchCurrentUser(token).pipe(
            map(response => response.data)
        );
    }
}