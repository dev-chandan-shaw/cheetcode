import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ISheet } from '../../../shared/models/sheet';
import { SheetService } from './services/sheet.service';
import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedSheetApiService } from '../../../shared/services/shared-sheet.api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sheet',
  imports: [CommonModule, NzCardModule, NzButtonModule, RouterModule, RouterModule, NzTabsModule],
  templateUrl: './sheet.html',
  styleUrl: './sheet.scss'
})
export class Sheet implements OnInit {
    sheets = signal<ISheet[]>([]);
    sharedSheets = signal<ISheet[]>([]);
    loading = signal(false);
    private _sheetService = inject(SheetService); // Assuming SheetApiService is injected for fetching sheets
    private _sharedSheetService = inject(SharedSheetApiService);
    private _messageService = inject(NzMessageService);
    copyToClipboard = (text: string) => {
        const link = `${environment.apiUrl}/shared-sheet/${text}`; // Adjust the URL as needed
        navigator.clipboard.writeText(link).then(() => {
            this._messageService.success('Link copied to clipboard!');
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
}
