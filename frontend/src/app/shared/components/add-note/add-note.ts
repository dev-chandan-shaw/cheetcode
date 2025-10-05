import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { QuestionStatusApiService } from '../../services/question-status-api.service';
import { Button } from "primeng/button";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-add-note',
  imports: [TextareaModule, FormsModule, Button],
  templateUrl: './add-note.html',
  styleUrl: './add-note.scss'
})
export class AddNote implements OnInit {
  note: string = '';
  isSaving: boolean = false;
  questionStatusService = inject(QuestionStatusApiService);
  dialogConfig = inject(DynamicDialogConfig);
  dynamicDialogRef = inject(DynamicDialogRef);

  ngOnInit() {
    if (this.dialogConfig.data && this.dialogConfig.data.note) {
      this.note = this.dialogConfig.data.note;
    }
  }

  saveNote() {
    const questionId = this.dialogConfig?.data?.questionId;
    if (!questionId) {
      console.error('Question ID is missing in dialog data');
      return;
    }
    const status = {
      questionId: questionId,
      note: this.note
    };
    this.isSaving = true;
    this.questionStatusService.updateQuestionStatus(status).subscribe({
      next: () => {
        this.dynamicDialogRef.close(this.note);
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error marking question for revision:', err);
        this.isSaving = false;
      }
    });
  }
}
