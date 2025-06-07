import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CreateUser } from "../models/createUser";
import { User } from "../models/user";
import { AuthApiService } from "./auth.api.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly _authApiService = inject(AuthApiService);
    private user = signal<User | null>(null);
    private readonly _router = inject(Router);
    private readonly _route = inject(ActivatedRoute);
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
        return this._authApiService.login(email, password);
    }


    getUser() {
        return this.user;
    }

    setUser(user: User) {
        this.user.set(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
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
        return this._authApiService.signup(data);
    }

    fetchCurrentUser(token : string) : Observable<User> {
        return this._authApiService.getCurrentUser(token);
    }

}
