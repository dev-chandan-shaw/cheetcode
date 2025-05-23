import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import environment from '../../environment';
import { Observable } from 'rxjs';
import { IQuestionNote } from '../models/question';

@Injectable()
export class QuestionNoteService {
  private _http = inject(HttpClient);
  private readonly _baseUrl = environment.api;

  setNote(questionId: number, note: string): Observable<IQuestionNote> {
    return this._http.post<IQuestionNote>(`${this._baseUrl}/question-note`, {
      questionId,
      note,
    });
  }

  getAllNotes(): Observable<IQuestionNote[]> {
    return this._http.get<IQuestionNote[]>(`${this._baseUrl}/question-note`);
  }
}
