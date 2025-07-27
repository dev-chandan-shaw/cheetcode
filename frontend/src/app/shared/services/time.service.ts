import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  // Cache the response to avoid multiple calls
  private today$: Observable<string>;

  constructor(private http: HttpClient) {
    this.today$ = this.http.get<string>('/api/v1/time/today').pipe(
      shareReplay(1) // Cache the result for subsequent subscribers
    );
  }

  /**
   * Gets the current UTC date from the backend.
   * The result is cached for the app's lifetime.
   */
  public getTodayUtc(): Observable<string> {
    return this.today$;
  }
}