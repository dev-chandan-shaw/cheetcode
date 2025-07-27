import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CategoryService } from '../../services/category/cateogory.service';
import { ICategory } from '../../models/category';
import { IAddQuestionDto, QuestionDifficulty } from '../../models/interface';
import { QuestionService } from '../../services/question/question.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-question',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCardModule,
    NzLayoutModule,
    NzGridModule,
    NzTypographyModule,
    CommonModule
  ],
  templateUrl: './add-question.html',
  styleUrl: './add-question.scss'
})
export class AddQuestion {

  validateForm!: FormGroup;
  categories = signal<ICategory[]>([]);
  readonly isLoading = signal(false);
  readonly sheetId = inject(NZ_MODAL_DATA).sheetId; // Assuming sheetId is passed as modal data
  readonly DIFFICULTIES = Object.values(QuestionDifficulty);
  private readonly _categoryService = inject(CategoryService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _questionService = inject(QuestionService);
  private _messageService = inject(NzMessageService);
  private _modalRef = inject(NzModalRef);


  ngOnInit(): void {
    this.validateForm = this._fb.group({
      title: [null, [Validators.required]],
      link: [null, [Validators.required, Validators.pattern('https?://.+')]],
      categoryId: [null, [Validators.required]],
      difficulty: [null, [Validators.required]],
    });
    this._loadCategories();
  }

  /**
   * Handles the form submission.
   */
  submitForm(): void {
    // Check if the form is valid
    if (this.validateForm.valid) {
      this.addQuestion();
    } else {
      this.validateForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
    }
  }

  /**
   * Loads categories from the CategoryService.
   */
  private _loadCategories() {
    this._categoryService.getCategories().subscribe(categories => {
      this.categories.set(categories);
    });
  }

  /**
   * Adds a new question using the QuestionService.
   */
  addQuestion() {
    this.isLoading.set(true);
    const data : IAddQuestionDto = {
      title: this.validateForm.value.title,
      link: this.validateForm.value.link,
      categoryId: this.validateForm.value.categoryId,
      difficulty: this.validateForm.value.difficulty,
      sheetId: this.sheetId
    };
    this._questionService.addQuestion(data).subscribe({
      next: (question) => {
        this.isLoading.set(false);
        this._messageService.success('Question added successfully!');
        this._modalRef.close(question); // Close the modal and return the new question
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error adding question:', error);
        this._messageService.error('Failed to add question. Please try again.');
      }
    });
  }
}
