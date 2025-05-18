import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { LoadingService } from '../../../shared/services/loading.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, HeaderComponent, ProgressBarModule, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    private readonly _loadingsService = inject(LoadingService);
    isLoading = this._loadingsService.isLoading();
} 
