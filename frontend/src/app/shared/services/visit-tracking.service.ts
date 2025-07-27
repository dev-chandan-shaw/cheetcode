// src/app/services/visit-tracking.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IApiResponse } from '../models/api-response';
import { IStreakUpdateResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class VisitTrackingService {

  private _apiUrl = environment.apiUrl;

  private _http = inject(HttpClient);

  private _streakResponse: IStreakUpdateResponse | null = null;

  updateDailyStreak(): Observable<IStreakUpdateResponse> {
    if (this._streakResponse) {
        return of(this._streakResponse);
    }
    return this._http.post<IApiResponse<IStreakUpdateResponse>>(`${this._apiUrl}/auth/streak/update`, {}).pipe(
      map(response => {
        // Handle the response and return the updated user
        return response.data;
      })
    );
  }
}