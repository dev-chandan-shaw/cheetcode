import { Component, inject, OnInit } from '@angular/core';
import { QuestionPatternService } from '../../services/question-pattern.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../models/category';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { CategoryApiService } from '../../services/category-api.service';

@Component({
  selector: 'app-create-question-pattern-form',
  imports: [ReactiveFormsModule, CommonModule, SelectModule, ButtonModule, InputText],
  templateUrl: './create-question-pattern-form.html',
  styleUrl: './create-question-pattern-form.scss'
})
export class CreateQuestionPatternForm implements OnInit {
  private readonly questionPatternService = inject(QuestionPatternService);
  private readonly categoryService = inject(CategoryApiService);
  private readonly messageService = inject(MessageService);
  private readonly dialogConfig = inject(DynamicDialogConfig);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(DynamicDialogRef);
  categories: ICategory[] = [];
  questionPatternForm = this.fb.group({
    name: [''],
    categoryId: ['']
  });

  isLoading = false;
  isEditMode = false;

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.data;
    });
    this.isEditMode = !!this.dialogConfig.data;
    if (this.isEditMode) {
      const data = this.dialogConfig.data;
      this.questionPatternForm.patchValue({
        name: data.name,
        categoryId: data.categoryId
      });
    }
  }

  onSubmit(): void {
    const { name, categoryId } = this.questionPatternForm.value;
    const body = {
      name: name as string,
      categoryId: Number(categoryId)
    };
    this.isLoading = true;
    if (this.isEditMode) {
      this.updateQuestionPattern(this.dialogConfig.data.id, body);
    } else {
      this.createQuestionPattern(body);
    }
  }

  createQuestionPattern(body: { name: string; categoryId: number }): void {
    this.questionPatternService.createQuestionPattern(body).subscribe(() => {
      this.questionPatternForm.reset();
      this.isLoading = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question Pattern created successfully' });
      this.dialogRef.close();
    });
  }

  updateQuestionPattern(id: number, body: { name: string; categoryId: number }): void {
    this.questionPatternService.updateQuestionPattern(id, body).subscribe((res) => {
      this.isLoading = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question Pattern updated successfully' });
      this.dialogRef.close(res);
    });
  }

}
