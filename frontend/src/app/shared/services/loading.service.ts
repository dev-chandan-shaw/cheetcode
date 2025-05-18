import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class LoadingService {
    private _isLoading = signal<boolean>(false);
    isLoading() {
        return this._isLoading;
    }
    startLoading() {
        this._isLoading.set(true);
    }
    stopLoading() {
        this._isLoading.set(false);
    }
}