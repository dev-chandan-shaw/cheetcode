import { Injectable, OnInit, Signal, signal } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class ImportantQuestionService implements OnInit {
  questions = signal<Question[]>([]);
  private questionSet = signal<Set<number>>(new Set<number>());

  ngOnInit(): void {
    this.questions().forEach((question) => {
      this.questionSet().add(question.id);
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
  }

  removeQuestion(question: Question) {
    const updatedSet = new Set(this.questionSet());
    updatedSet.delete(question.id);
    this.questionSet.set(updatedSet);
  }
}
