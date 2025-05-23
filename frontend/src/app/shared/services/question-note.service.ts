import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import environment from '../../environment';
import { Observable } from 'rxjs';
import { IQuestionNote } from '../models/question';

@Injectable({providedIn: 'root'})
export class QuestionNoteService {
  private _http = inject(HttpClient);
  private readonly _baseUrl = environment.api;

  private questionNoteMap = new Map<number,string>();

  setNote(questionId: number, note: string): Observable<IQuestionNote> {
    return this._http.post<IQuestionNote>(`${this._baseUrl}/question-note`, {
      questionId,
      note,
    });
  }

  getAllNotes(): Observable<IQuestionNote[]> {
    return this._http.get<IQuestionNote[]>(`${this._baseUrl}/question-note`);
  }

  setQuestionNoteMap(questionNotes: IQuestionNote[]) {
    const map = new Map<number, string>();
    questionNotes.forEach((note) => {
      map.set(note.question.id, note.note);
    });
    this.questionNoteMap = map;
    
  }

  getQuestionNote(questionId: number): string {
    return this.questionNoteMap.get(questionId) || '';
  }

  updateQuestionNote(questionId: number, note: string) {
    this.questionNoteMap.set(questionId, note);
  }
}
