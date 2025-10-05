import { inject, Injectable, Signal, signal } from "@angular/core";
import { AuthApiService } from "./auth-api.service";
import { map, Observable } from "rxjs";
import { jwtDecode } from 'jwt-decode';
import { IUser } from "../../../shared/models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _authApiService = inject(AuthApiService);
    private _loggedInUser = signal<IUser | null>(null);
    private _isLoggedIn = signal<boolean | null>(false);
    private _isAdmin = signal<boolean | null>(false);

    isAdmin() {
        if (!this._isAdmin()) {
            this.getLoggedInUser();
            const user = this._loggedInUser();
            const token = user?.token;
            if (token) {
                const roles = this.getRoles(token);
                this._isAdmin.set(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPER_ADMIN'));
            }
        }
        return this._isAdmin;
    }

    getLoggedInUser(): Signal<IUser | null> {
        if (!this._loggedInUser()) {
            const user = localStorage.getItem('loggedInUser');
            this._loggedInUser.set(user ? JSON.parse(user) : null);
        }
        return this._loggedInUser;
    }

    login(username: string, password: string): Observable<IUser> {
        return this._authApiService.login(username, password).pipe(
            map(response => {
                const user = response.data;
                this.setUser(user);
                return user;
            })
        );
    }

    register(data: IUser): Observable<IUser> {
        return this._authApiService.register(data).pipe(
            map(response => {
                const user = response.data;
                this.setUser(user);
                return user;
            })
        );
    }

    fetchCurrentUser(token: string): Observable<IUser> {
        return this._authApiService.fetchCurrentUser(token).pipe(
            map(response => {
                const user = response.data;
                this.setUser(user);
                return user;
            })
        );
    }

    setUser(user: IUser): void {
        const token = user.token;
        if (token) {
            const decodedToken: any = jwtDecode(token);
            const roles = decodedToken.roles || [];

            this._isAdmin.set(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPER_ADMIN'));

            this._isLoggedIn.set(true);
        }
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this._loggedInUser.set(user);
    }

    getRoles(token: string): string[] {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.roles || [];
    }
}