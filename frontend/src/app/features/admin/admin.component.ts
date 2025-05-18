import { Component, inject } from '@angular/core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
@Component({
  selector: 'admin',
  imports: [DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  ref: DynamicDialogRef | undefined;
  addQuestionDialogRef: DynamicDialogRef | undefined;
  addCategoryDialogRef: DynamicDialogRef | undefined;
  private dialogService = inject(DialogService);
  show() {
    this.ref = this.dialogService.open(AddCategoryComponent, {
      header: 'Select a Product', width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });
  }

  openAddQuestionDialog() {
    this.addQuestionDialogRef = this.dialogService.open(AddQuestionComponent, {
      header: 'Add Question', width: 'min(100%, 400px)',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });
  }

  openAddCategoryDialog() {
    this.addCategoryDialogRef = this.dialogService.open(AddCategoryComponent, {
      header: 'Add Category', width: 'min(100%, 400px)',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });
  }
}
