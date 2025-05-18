import { inject, Injectable, signal } from '@angular/core';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import environment from '../../environment';
import { AddQuestion } from '../models/createQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private _http = inject(HttpClient)
  private readonly baseUrl = environment.api;

  fetchQuestions() {
    return this._http.get<Question[]>(`${this.baseUrl}/question`);
  }

  addQuestion(question: AddQuestion) {
    return this._http.post(`${this.baseUrl}/question`, question);
  }
}
