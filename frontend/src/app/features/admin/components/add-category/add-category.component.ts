import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'app-add-category',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
  providers: [MessageService],
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  private _dialogRef = inject(DynamicDialogRef);
  private _categoryService = inject(CategoryService);

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      this._categoryService.addCategory(category.name).subscribe(() => {
        this.onClose();
      })
    }
  }

  onClose() {
    this._dialogRef.close();
  }
}
