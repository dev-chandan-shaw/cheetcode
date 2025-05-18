import { inject, Injectable, signal } from "@angular/core";
import { AuthApiService } from "./auth.api.service";
import { User } from "../models/user";
import { CreateUser } from "../models/createUser";
import { Router } from "@angular/router";
import { Observable, tap, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly _authApiService = inject(AuthApiService);
    private user = signal<User | null>(null);
    private readonly _router = inject(Router);
    isLoading = signal<boolean>(false);

    constructor() {
        const user = localStorage.getItem('user');
        if (user) {
            this.user.set(JSON.parse(user));
        }
    }
    // auth.service.ts
    login(email: string, password: string): Observable<User> {
        this.isLoading.set(true);
        return this._authApiService.login(email, password).pipe(
            tap((res: User) => {
                this.isLoading.set(false);
                this.user.set(res);
                localStorage.setItem('user', JSON.stringify(res));
            }),
            catchError((err) => {
                this.isLoading.set(false);
                return throwError(() => err);
            })
        );
    }



    getUser() {
        return this.user;
    }

    isLoggedIn() {
        const user = localStorage.getItem("user");
        if (user) {
            this.user.set(JSON.parse(user));
            return true;
        }
        return false;
    }

    logout() {
        this.user.set({} as User);
        localStorage.removeItem("user");
        this._router.navigate(['/signin']);
    }

    signup(data: CreateUser) {
        this.isLoading.set(true);
        return this._authApiService.signup(data).pipe(
            tap((res: User) => {
                this.isLoading.set(false);
                this.user.set(res);
                localStorage.setItem('user', JSON.stringify(res));
                this._router.navigate(['/']);
            }),
            catchError((err) => {
                this.isLoading.set(false);
                this.isLoading.set(false);
                return throwError(() => err);
            })
        )
    }
}