import { Component, inject, Input } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { QuestionNoteService } from '../../services/question-note.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-question-note',
  imports: [TextareaModule, FormsModule, ButtonModule],
  providers: [QuestionNoteService],
  templateUrl: './question-note.component.html',
  styleUrl: './question-note.component.scss',
})
export class QuestionNoteComponent {
  private _questionNoteService = inject(QuestionNoteService);
  private _config = inject(DynamicDialogConfig);
  private _ref = inject(DynamicDialogRef);
  private questionId = this._config.data.questionId;
  note: string = this._config.data.note || '';

  saveNote() {
    this._questionNoteService.setNote(this.questionId, this.note).subscribe({
      next: (response) => {
        console.log('Note saved successfully', response);
        this._ref.close();
      },
      error: (error) => {
        console.error('Error saving note', error);
      },
    });
  }
}
