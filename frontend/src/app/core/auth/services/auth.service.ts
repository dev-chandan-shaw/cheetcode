import { inject, Injectable, signal } from "@angular/core";
import { AuthApiService } from "./auth.api.service";
import { User } from "../models/user";
import { CreateUser } from "../models/createUser";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly _authApiService = inject(AuthApiService);
    private user = signal<User>({} as User);
    private readonly _router = inject(Router);
    login(email: string, password: string) {
        return this._authApiService.login(email, password).subscribe((res: User) => {
            this.user.set(res);
            localStorage.setItem("user", JSON.stringify(res));
            this._router.navigate(['/']);
        })
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

    signup(data : CreateUser) {
        return this._authApiService.signup(data).subscribe((res : User) => {
            this.user.set(res);
            localStorage.setItem("user", JSON.stringify(res));
            this._router.navigate(['/']);
        })
    }
}