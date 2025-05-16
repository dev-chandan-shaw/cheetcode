import { Injectable, OnInit, Signal, signal } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class SavedQuestionService implements OnInit {
  questions = signal<Question[]>([]);
  savedQuestionState = signal<Set<number>>(new Set<number>());

  ngOnInit(): void {
    this.questions().forEach((question) => {
      this.questions().push(question);
    });
  }

  getSavedQuestionState(): Signal<Set<number>> {
    return this.savedQuestionState;
  }

  addQuestion(question: Question) {
    console.log(question, 'question');
    const updatedSet = new Set(this.savedQuestionState());
    updatedSet.add(question.id);
    this.savedQuestionState.set(updatedSet);
    const updated = [...this.questions(), question];
    this.questions.set(updated);
    console.log(this.questions(), 'questions');
  }

  removeQuestion(question: Question) {
    const updatedSet = new Set(this.savedQuestionState());
    updatedSet.delete(question.id);
    this.savedQuestionState.set(updatedSet);
    const updated = this.questions().filter((q) => q !== question);
    this.questions.set(updated);
  }
}
