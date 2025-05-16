import {
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  Signal,
} from '@angular/core';
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportantQuestionService } from '../../services/startedQuestion.service';
import { ButtonModule } from 'primeng/button';
import { SavedQuestionService } from '../../services/saved-question.service';

@Component({
  selector: 'app-question-card',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCardComponent {
  question = input.required<Question>();
  index = input.required<number>();
  isHovered = false;
  private readonly _importantQuestionService = inject(ImportantQuestionService);
  private readonly _savedQuestionService = inject(SavedQuestionService);
  importQuestions = this._importantQuestionService.getImportantQuestionState();
  isMarkedForRevision: Signal<boolean> = linkedSignal(() =>
    this.importQuestions().has(this.question().id)
  );
  savedQuestions = this._savedQuestionService.getSavedQuestionState();
  isBookmarked: Signal<boolean> = linkedSignal(() =>
    this.savedQuestions().has(this.question().id)
  );

  constructor() {
    effect(() =>
      console.log(this.isMarkedForRevision(), 'isMarkedForRevision')
    );
  }

  toggleBookmark() {
    if (!this.isBookmarked())
      this._savedQuestionService.addQuestion(this.question());
  }
  toggleRevision() {
    if (!this.isMarkedForRevision())
      this._importantQuestionService.addQuestion(this.question());
    else this._importantQuestionService.removeQuestion(this.question());
  }
}
