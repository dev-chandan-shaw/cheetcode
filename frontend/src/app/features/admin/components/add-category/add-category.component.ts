import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

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
  @Output() isCategoryModalOpen = false;
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      // You can send this to a backend service
      console.log('Category Added:', category);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category added successfully!',
      });

      this.categoryForm.reset();
    }
  }
}
