import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TextareaModule } from 'primeng/textarea';
import { QuestionNoteService } from '../../services/question-note.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-question-note',
  imports: [TextareaModule, FormsModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './question-note.component.html',
  styleUrl: './question-note.component.scss',
})
export class QuestionNoteComponent {
  private _questionNoteService = inject(QuestionNoteService);
  private _config = inject(DynamicDialogConfig);
  private _ref = inject(DynamicDialogRef);
  private questionId = this._config.data.questionId;
  note = this._questionNoteService.getQuestionNote(this.questionId);
  isLoading = false;
  

  saveNote() {
    this.isLoading = true;
    this._questionNoteService.setNote(this.questionId, this.note).subscribe({
      next: (response) => {
        this._questionNoteService.updateQuestionNote(this.questionId, this.note);
        this._ref.close();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error saving note', error);
        this.isLoading = false;
      },
    });
  }
}
