import { Injectable, signal } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor() {}

  questions = signal<Question[]>([]);
}
