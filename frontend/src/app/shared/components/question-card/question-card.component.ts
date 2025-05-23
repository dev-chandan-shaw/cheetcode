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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QuestionNoteComponent } from '../question-note/question-note.component';

@Component({
  selector: 'app-question-card',
  imports: [CommonModule, RouterModule, ButtonModule],
  providers: [DialogService],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCardComponent {
  question = input.required<Question>();
  index = input.required<number>();
  isHovered = false;
  private readonly _importantQuestionService = inject(ImportantQuestionService);
  private readonly _savedQuestionService = inject(SavedQuestionService);
  private readonly _dynamicDialogService = inject(DialogService);
  private _dynamicDialogRef: DynamicDialogRef | null = null;
  importQuestions = this._importantQuestionService.getImportantQuestionState();
  isMarkedForRevision: Signal<boolean> = linkedSignal(() =>
    this.importQuestions().has(this.question().id)
  );
  savedQuestions = this._savedQuestionService.getSavedQuestionState();
  isBookmarked: Signal<boolean> = linkedSignal(() =>
    this.savedQuestions().has(this.question().id)
  );

  toggleBookmark() {
    if (!this.isBookmarked())
      this._savedQuestionService.addQuestion(this.question());
  }
  toggleRevision() {
    if (!this.isMarkedForRevision())
      this._importantQuestionService.addQuestion(this.question());
    else this._importantQuestionService.removeQuestion(this.question());
  }

  openNotesDialog() {
    this._dynamicDialogRef = this._dynamicDialogService.open(
      QuestionNoteComponent,
      {
        header: 'Question Note',
        contentStyle: { 'max-height': '80vh', overflow: 'auto' },
        closable: true,
        modal: true,
        width: 'min(90vw, 600px)',
        data: {
          questionId: this.question().id
        },
      }
    );
  }
}
