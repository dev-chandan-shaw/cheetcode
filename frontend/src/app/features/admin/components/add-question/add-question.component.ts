import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { Category } from '../../../../shared/models/category';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';
import { QuestionService } from '../../../../shared/services/question.service';
import { AddQuestion } from '../../../../shared/models/createQuestion';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-question',
  imports: [
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    FloatLabel,
    SelectModule,
    ReactiveFormsModule,
    ProgressSpinner,
    CommonModule
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss',
})
export class AddQuestionComponent implements OnInit {
  private _categoryService = inject(CategoryService);
  private _dyanmicDialogRef = inject(DynamicDialogRef);
  private _questionService = inject(QuestionService);
  private fb = inject(FormBuilder);
  isLoading = signal<boolean>(false);
  categories: Signal<Category[]> = this._categoryService.getCategories();
  questionForm = this.fb.group({
    title: ['', Validators.required],
    link: ['', Validators.required],
    categoryId: ['', Validators.required],
  });

  // constructor(private fb: FormBuilder) {
  //   this.categoryForm = this.fb.group({
  //     name: ['', Validators.required],
  //   });
  // }

  ngOnInit(): void {
    this._categoryService.fetchCategories();
  }

  onSubmit() {
    if (this.questionForm.invalid) return;
    const { title, link, categoryId } = this.questionForm.value;
    if (!title || !link || !categoryId) {
      return;
    }

    const question: AddQuestion = {
      title,
      link,
      categoryId,
    };

    this.isLoading.set(true);
    this._questionService.addQuestion(question).subscribe({
    
      next: () => {
        this.isLoading.set(false);
        this.onCancel(); // closes the dialog on success
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Failed to add question', err);
        // You can optionally show a toast here
      }
    });
  }

  onCancel() {
    this._dyanmicDialogRef.close();
  }
}
