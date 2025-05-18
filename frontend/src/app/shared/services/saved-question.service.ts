import { inject, Injectable, linkedSignal, OnInit, Signal, signal } from '@angular/core';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import environment from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class SavedQuestionService {
  private _http = inject(HttpClient);
  private readonly _baseUrl = environment.api;
  private questions = signal<Question[]>([]);
  isLoading = signal<boolean>(false);
  savedQuestionState = linkedSignal(() => {
    const set = new Set<number>();
    this.questions().forEach((question) => {
      set.add(question.id);
    });
    return set;
  })


  fetchQuestions() {
    this.isLoading.set(true);
    this._http
      .get<Question[]>(`${this._baseUrl}/saved-question`)
      .subscribe((questions) => {
        this.questions.set(questions);
        this.isLoading.set(false);
      });
  }

  getQuestions(): Signal<Question[]> {
    return this.questions;
  }

  getSavedQuestionState(): Signal<Set<number>> {
    return this.savedQuestionState;
  }

  addQuestion(question: Question) {
  // Optimistically update UI
  const prevSavedSet = new Set(this.savedQuestionState());

  const updatedSet = new Set(prevSavedSet);
  updatedSet.add(question.id);
  this.savedQuestionState.set(updatedSet);

  // Fire the API call
  this._http.post(`${this._baseUrl}/saved-question?questionId=${question.id}`, {}).subscribe({
    next: () => {
      // API succeeded, do nothing – UI is already updated
    },
    error: () => {
      // Rollback the changes on failure
      this.savedQuestionState.set(prevSavedSet);
      // Optional: Show error message to user
      console.error('Failed to save question.');
    },
  });
}


  removeQuestion(question: Question) {
    const updatedSet = new Set(this.savedQuestionState());
    updatedSet.delete(question.id);
    this.savedQuestionState.set(updatedSet);
    const updated = this.questions().filter((q) => q !== question);
    this.questions.set(updated);
    this._http.delete(`${this._baseUrl}/saved-question?questionId=${question.id}`).subscribe();
  }
}
