import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabsModule } from 'primeng/tabs';
import { environment } from '../../../../environments/environment';
import { AddQuestion } from '../../../shared/components/add-question/add-question';
import { ISheet } from '../../../shared/models/sheet';
import { SharedSheetApiService } from './services/shared-sheet.service';
import { SheetService } from './services/sheet.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-sheet',
  imports: [ButtonModule, ProgressSpinnerModule, CardModule, TabsModule, RouterModule, NgTemplateOutlet, TooltipModule, DialogModule],
  providers: [DialogService],
  templateUrl: './sheet.html',
  styleUrl: './sheet.scss'
})
export class Sheet {
  sheets = signal<ISheet[]>([]);
  sharedSheets = signal<ISheet[]>([]);
  loading = signal(false);
  isAddQuestionDialogVisible = signal(false);

  private _sheetService = inject(SheetService);
  private _sharedSheetService = inject(SharedSheetApiService);
  private _messageService = inject(MessageService);
  private _dialogService = inject(DialogService);


  // Copy to clipboard
  copyToClipboard = (text: string) => {
    const link = `${environment.sharedSheetUrl}/${text}`;
    navigator.clipboard.writeText(link).then(() => {
      this._messageService.add({ severity: 'success', summary: 'Copied', detail: 'Link copied to clipboard!' });
    });
  }

  ngOnInit(): void {
    this._loadSheets();
    this._loadSharedSheets();
  }

  private _loadSheets(): void {
    this.loading.set(true);
    this._sheetService.getAllSheets().subscribe({
      next: (sheets) => {
        this.sheets.set(sheets);
        this.loading.set(false);
      },
      error: () => {
        this.sheets.set([]);
        this.loading.set(false);
      }
    });
  }

  openCreateSheetModal(): void {
    const title = prompt('Enter sheet title:');
    if (title) {
      this._sheetService.createSheet(title).subscribe({
        next: (newSheet) => {
          this.sheets.update((sheets) => [...sheets, newSheet]);
        },
        error: (error) => {
          console.error('Error creating sheet:', error);
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create sheet.' });
        }
      });
    }
  }

  openJoinSheetModal(): void {
    const slug = prompt('Enter sheet url:');
    if (slug) {
      const extractedSlug = slug.split('/').pop();
      this._sharedSheetService.joinSharedSheet(extractedSlug || slug).subscribe({
        next: (newSheet) => {
          this.sharedSheets.update((sheets) => [...sheets, newSheet]);
        },
        error: (error) => {
          console.error('Error joining sheet:', error);
          this._messageService.add({ severity: 'error', summary: 'Error', detail: error?.error || 'Failed to join sheet.' });
        }
      });
    }
  }


  private _loadSharedSheets(): void {
    this.loading.set(true);
    this._sharedSheetService.getAllSharedSheets().subscribe({
      next: (sharedSheets) => {
        this.sharedSheets.set(sharedSheets);
        this.loading.set(false);
      },
      error: () => {
        this.sharedSheets.set([]);
        this.loading.set(false);
      }
    });
  }

  openAddQuestionModal(sheetId: number): void {
    const ref = this._dialogService.open(AddQuestion, {
      header: 'Add Question',
      modal: true,
      width: 'min(90%, 600px)',
      closable: true,
      data: { sheetId: sheetId },
    });
  }
}
