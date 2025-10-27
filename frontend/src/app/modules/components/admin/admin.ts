import { CommonModule } from '@angular/common';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Chip, ChipModule } from "primeng/chip";
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { CreateQuestionPatternForm } from '../../../shared/components/create-question-pattern-form/create-question-pattern-form';
import { IUnapprovedQuestion, QuestionDifficulty, TagSeverity } from '../../../shared/models/interface';
import { QuestionService } from '../../../shared/services/question.service';
import { TabsModule } from 'primeng/tabs';
import { QuestionPattern, QuestionPatternService } from '../../../shared/services/question-pattern.service';
import { CategoryApiService } from '../../../shared/services/category-api.service';
import { ICategory } from '../../../shared/models/category';

@Component({
  selector: 'app-admin',
  imports: [CardModule, CommonModule, TagModule, ProgressSpinner, ButtonModule, TabsModule, ChipModule],
  providers: [DialogService],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

  unapprovedQuestions = signal<IUnapprovedQuestion[]>([]);
  isLoading = signal<boolean>(false);
  questionPatterns = signal<QuestionPattern[]>([]);
  filteredQuestionPatterns = linkedSignal(this.questionPatterns);
  categories: ICategory[] = [];
  selectedCategory = signal<number | 'all'>('all');
  private _questionService = inject(QuestionService);
  private _messageService = inject(MessageService);
  private _dialogService = inject(DialogService);
  private _questionPatternService = inject(QuestionPatternService);
  private _categoryService = inject(CategoryApiService);

  ngOnInit(): void {
    this.loadUnapprovedQuestions();
    this.loadQuestionPatterns();
    this.loadCategoryData();
  }

  addCategory() {
    // Logic to add a new category
    const categoryName = prompt('Enter new category name:');
    if (categoryName?.trim()) {
      this._categoryService.createCategory(categoryName).subscribe({
        next: (res) => {
          this.categories.push(res.data);
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Category created successfully.' });
        },
        error: (error) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create category.' });
          console.error('Error creating category:', error);
        }
      });
    }
  }

  updateCategory(category: ICategory) {
    const newName = prompt('Enter new name for the category:', category.name);
    if (newName && newName.trim() && newName !== category.name) {
      this._categoryService.updateCategory(category.id as number, newName).subscribe({
        next: (res) => {
          category.name = res.data.name;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully.' });
        },
        error: (error) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update category.' });
          console.error('Error updating category:', error);
        }
      });
    }
  }

  loadCategoryData(): void {
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.categories.unshift({ id: 'all', name: 'All' });
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  loadUnapprovedQuestions(page: number = 0): void {
    this.isLoading.set(true);
    this._questionService.getUnapprovedQuestions(page).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.unapprovedQuestions.set(response.data.content);
      },
      error: (error) => {
        this.isLoading.set(false);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load unapproved questions.' });
        console.error('Error fetching unapproved questions:', error);
      }
    });
  }

  viewQuestion(question: IUnapprovedQuestion): void {
    // Logic to view question details, e.g., navigate to a question detail page
    window.open(question.link, '_blank');
  }

  approveQuestion(question: IUnapprovedQuestion): void {
    this.isLoading.set(true);
    this._questionService.approveQuestion(question.id).subscribe({
      next: () => {
        // Update the local state to reflect the approved question
        this.isLoading.set(false);
        const updatedQuestions = this.unapprovedQuestions().filter(q => q.id !== question.id);
        this.unapprovedQuestions.set(updatedQuestions);
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Question approved successfully.' });
      },
      error: (error) => {
        this.isLoading.set(false);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || 'Failed to approve question' });
        console.error('Error approving question:', error);
      }
    });
  }

  archiveQuestion(question: IUnapprovedQuestion): void {
    this.isLoading.set(true);
    this._questionService.archiveQuestion(question.id).subscribe({
      next: () => {
        this.isLoading.set(false);
        const updatedQuestions = this.unapprovedQuestions().filter(q => q.id !== question.id);
        this.unapprovedQuestions.set(updatedQuestions);
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Question archived successfully.' });
      },
      error: (error) => {
        this.isLoading.set(false);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || 'Failed to archive question' });
        console.error('Error archiving question:', error);
      }
    });
  }

  loadQuestionPatterns(): void {
    this._questionPatternService.getAllQuestionPatterns().subscribe({
      next: (res) => {
        console.log('Question Patterns:', res);
        this.questionPatterns.set(res);
      },
      error: (err) => {
        console.error('Error fetching question patterns:', err);
      }
    });
  }

  selectQuestionPatternCategory(categoryId: number | 'all'): void {
    this.selectedCategory.set(categoryId);
    if (categoryId === 'all') {
      this.filteredQuestionPatterns.set(this.questionPatterns());
    } else {
      const filtered = this.questionPatterns().filter(pattern => pattern.categoryId === categoryId);
      this.filteredQuestionPatterns.set(filtered);
    }
  }

  openAddQuestionPatternDialog(): void {
    // Logic to open dialog for adding question pattern
    const ref = this._dialogService.open(CreateQuestionPatternForm, {
      header: 'Create Question Pattern',
      width: 'min(600px, 90%)',
      closable: true,
      modal: true
    });
  }

  editQuestionPattern(pattern: QuestionPattern): void {
    const ref = this._dialogService.open(CreateQuestionPatternForm, {
      header: 'Edit Question Pattern',
      width: 'min(600px, 90%)',
      closable: true,
      modal: true,
      data: { id: pattern.id, name: pattern.name, categoryId: pattern.categoryId }
    });
    ref?.onClose.subscribe((result) => {
      if (result) {
        const index = this.questionPatterns().findIndex(p => p.id === result.id);
        if (index !== -1) {
          const updatedPatterns = [...this.questionPatterns()];
          updatedPatterns[index] = result;
          this.questionPatterns.set(updatedPatterns);
          this.selectQuestionPatternCategory(this.selectedCategory() ?? 'all');
        }
      }
    });
  }

  confirmApprove(question: IUnapprovedQuestion): void {
    if (confirm(`Are you sure you want to approve the question: "${question.title}"?`)) {
      this.approveQuestion(question);
    }
  }

  getSeverity(difficulty: QuestionDifficulty): TagSeverity {
    switch (difficulty) {
      case QuestionDifficulty.Easy:
        return 'success';
      case QuestionDifficulty.Medium:
        return 'warn';
      case QuestionDifficulty.Hard:
        return 'danger';
      default:
        return null;
    }
  }
}
