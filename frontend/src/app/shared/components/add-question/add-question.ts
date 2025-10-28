import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../models/category';
import { CategoryApiService } from '../../services/category-api.service';
import { Select } from "primeng/select";
import { QuestionService } from '../../services/question.service';
import { IAddQuestionDto, QuestionDifficulty } from '../../models/interface';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Problem } from '../question-grid/question-grid';
import { QuestionPatternService } from '../../services/question-pattern.service';
import { forkJoin } from 'rxjs';

export interface IQuestionPattern {
  id: number;
  name: string;
  categoryId?: number;
}

@Component({
  selector: 'app-add-question',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, CommonModule, Select],
  templateUrl: './add-question.html',
  styleUrl: './add-question.scss'
})
export class AddQuestion implements OnInit {
  readonly DIFFICULTIES = Object.values(QuestionDifficulty);
  private readonly _categoryService = inject(CategoryApiService);
  private readonly _questionService = inject(QuestionService);
  private readonly _messageService = inject(MessageService);
  private readonly _modalRef = inject(DynamicDialogRef);
  private readonly _config = inject(DynamicDialogConfig);
  private readonly _questionPatternService = inject(QuestionPatternService);

  questionForm: FormGroup;
  categories: ICategory[] = [];
  questionPatterns: IQuestionPattern[] = [];
  filteredQuestionPatterns: IQuestionPattern[] = [];
  isSubmitting: boolean = false;
  isEditMode: boolean = false;
  questionToEdit?: Problem;


  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      categoryId: [null, Validators.required],
      difficulty: [null, Validators.required],
      questionPatternId: [null, Validators.required]
    });
  }

  ngOnInit() {
    // Check if we're in edit mode
    this.questionToEdit = this._config.data?.question;
    this.isEditMode = !!this.questionToEdit;

    this.questionForm.get('categoryId')?.valueChanges.subscribe(categoryId => {
      // Filter the patterns based on selected category
      this.filteredQuestionPatterns = this.questionPatterns.filter(pattern =>
        !categoryId || pattern.categoryId === categoryId
      );
    });



    if (this.isEditMode && this.questionToEdit) {
      this.questionForm.patchValue({
        title: this.questionToEdit.title,
        link: this.questionToEdit.link,
        categoryId: this.questionToEdit.categoryId,
        difficulty: this.questionToEdit.difficulty,
        questionPatternId: this.questionToEdit.patternId
      });
    }

    forkJoin({
      categories: this._categoryService.getCategories(),
      questionPatterns: this._questionPatternService.getAllQuestionPatterns()
    }).subscribe({
      next: ({ categories, questionPatterns }) => {
        this.categories = categories.data;
        this.questionPatterns = questionPatterns;
        this.filteredQuestionPatterns = questionPatterns.filter(pattern =>
          pattern.categoryId === this.questionForm.get('categoryId')?.value
        );
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });

  }

  submitForm() {
    if (this.questionForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const formData = this.questionForm.value;

    if (this.isEditMode && this.questionToEdit) {
      // Update existing question
      const updateData: Partial<IAddQuestionDto> = {
        title: formData.title,
        link: formData.link,
        categoryId: formData.categoryId,
        difficulty: formData.difficulty,
        questionPatternId: formData.questionPatternId
      };

      this._questionService.updateQuestion(this.questionToEdit.id, updateData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Question updated successfully!'
          });
          this._modalRef.close({
            ...this.questionToEdit,
            ...updateData,
            patternId: formData.questionPatternId
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error updating question:', error);
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update question. Please try again.'
          });
        }
      });
    } else {
      // Add new question
      const data: IAddQuestionDto = {
        title: formData.title,
        link: formData.link,
        categoryId: formData.categoryId,
        difficulty: formData.difficulty,
        sheetId: this._config.data?.sheetId
      };

      this._questionService.addQuestion(data).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Question added successfully!'
          });
          this._modalRef.close(response.data);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error adding question:', error);
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add question. Please try again.'
          });
        }
      });
    }
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Edit Question' : 'Add Question';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Question' : 'Add Question';
  }

  get submitButtonIcon(): string {
    return this.isEditMode ? 'pi pi-check' : 'pi pi-plus';
  }
}
