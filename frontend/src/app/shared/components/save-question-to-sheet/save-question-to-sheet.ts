import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SheetService } from '../../../modules/components/sheet/services/sheet.service';
import { ISheet } from '../../models/sheet';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SheetQuestionService } from '../../../modules/components/sheet/services/sheet-question.service';
import { ProgressSpinner } from "primeng/progressspinner";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-save-question-to-sheet',
  imports: [RadioButtonModule, FormsModule, ButtonModule, ProgressSpinner],
  templateUrl: './save-question-to-sheet.html',
  styleUrl: './save-question-to-sheet.scss'
})
export class SaveQuestionToSheet implements OnInit {
  mySheets: ISheet[] = [];
  isSaving = false;
  isLoading = false;
  selectedSheetId: number | null = null;
  private readonly _config = inject(DynamicDialogConfig);
  private readonly _ref = inject(DynamicDialogRef);
  private sheetService = inject(SheetService);
  private sheetQuestionService = inject(SheetQuestionService);
  private messageService = inject(MessageService);
  ngOnInit(): void {
    this.isLoading = true;
    this.sheetService.getAllSheets().subscribe({
      next: (res) => {
        this.mySheets = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching sheets:', err);
      }
    });
  }

  addQuestionToSheet(): void {
    if (!this.selectedSheetId) {
      return;
    }
    this.isSaving = true;
    const questionId = this._config.data.questionId;
    this.sheetQuestionService.addQuestionToSheet(this.selectedSheetId, questionId).subscribe({
      next: () => {
        this.isSaving = false;
        this._ref.close(true);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question added to sheet successfully.' });
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error adding question to sheet:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add question to sheet.' });
      }
    });
  }
}
