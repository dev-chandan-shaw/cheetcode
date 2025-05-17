import { inject, Injectable, linkedSignal, OnInit, Signal, signal } from '@angular/core';
import { Question } from '../models/question';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import environment from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class ImportantQuestionService {
  private questionSet = signal<Set<number>>(new Set());
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = environment.api;

  fetchQuestions() {
    this._http
      .get<Question[]>(`${this.baseUrl}/important-question`)
      .subscribe((questions) => {
        this.questionSet.set(new Set(questions.map((q) => q.id)));
      });
  }


  getImportantQuestionState(): Signal<Set<number>> {
    return this.questionSet;
  }

  addQuestion(question: Question) {
    const updatedSet = new Set(this.questionSet());
    updatedSet.add(question.id);
    this.questionSet.set(updatedSet); // Replace the signal value
    console.log(this.questionSet(), 'question set');
    this._http.post(`${this.baseUrl}/important-question?questionId=${question.id}`, {}).subscribe();
  }

  removeQuestion(question: Question) {
    const updatedSet = new Set(this.questionSet());
    updatedSet.delete(question.id);
    this.questionSet.set(updatedSet);
    this._http.delete(`${this.baseUrl}/important-question?questionId=${question.id}`).subscribe();
  }
}
