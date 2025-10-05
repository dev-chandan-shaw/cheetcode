import { Component, inject, input, linkedSignal, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { forkJoin, Observable } from 'rxjs';
import { IApiResponse } from '../../models/api-response';
import { ICategory } from '../../models/category';
import { IUserQuestionStatus, UserQuestionStatusDto } from '../../models/question-status';
import { CategoryApiService } from '../../services/category-api.service';
import { QuestionStatusApiService } from '../../services/question-status-api.service';
import { AddNote } from '../add-note/add-note';
import { RouterModule } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ISheet } from '../../models/sheet';
import { SheetService } from '../../../modules/components/sheet/services/sheet.service';
import { Select } from "primeng/select";
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { SaveQuestionToSheet } from '../save-question-to-sheet/save-question-to-sheet';
import { AddQuestion } from '../add-question/add-question';
import { AuthService } from '../../../core/services/auth/auth.service';

export interface Problem {
  id: number;
  title: string;
  link: string;
  difficulty: 'EASY' | 'MED' | 'HARD';
  isApproved: boolean;
  isArchived: boolean;
  patternName: string;
  categoryId: number;
  sheetId?: number;
}

export interface BaseQuestionService {
  getQuestions(extraParams?: any): Observable<Problem[]>;
  pickRandom(categoryId: number | 'all', extraParams?: any): Observable<Problem>;
}


@Component({
  selector: 'app-question-grid',
  imports: [TableModule, TagModule, ButtonModule, CheckboxModule, ChipModule, TooltipModule, RouterModule, ProgressBarModule, NgTemplateOutlet, DialogModule, Select, MenuModule, PopoverModule, CommonModule],
  providers: [DialogService],
  templateUrl: './question-grid.html',
  styleUrl: './question-grid.scss'
})
export class QuestionGrid implements OnInit {
  questionService = input<BaseQuestionService>();
  params = input();
  questions: Problem[] = [];
  filteredQuestions: Problem[] = [];
  questionStatuses: { [questionId: number]: IUserQuestionStatus } = {};
  categories: ICategory[] = [];
  mySheets: ISheet[] = [];
  questionStatusService = inject(QuestionStatusApiService);
  sheetService = inject(SheetService);
  selectedCategory: number | 'all' = 'all';
  categoryService = inject(CategoryApiService);
  isLoading = false;
  isGroupedByPattern = false;
  isAddQuestionDialogVisible = false;
  private _dialogService = inject(DialogService);
  private _authService = inject(AuthService);
  isAdmin = this._authService.isAdmin();

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (res: IApiResponse<ICategory[]>) => {
        this.categories = [{ id: 'all', name: 'All' } as ICategory].concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
    if (this.questionService()) {
      this.isLoading = true;
      this.questionService()!.getQuestions(this.params()).subscribe({

        next: (res) => {
          this.isLoading = false;
          this.questions = res.map(q => {
            return { ...q, patternName: q.patternName || 'Miscellaneous' };
          });
          this.filteredQuestions = this.questions;
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching questions:', err);
        }
      });
    }


    this.questionStatusService.getAllQuestionStatuses().subscribe({
      next: (res) => {
        res.data.forEach(status => {
          this.questionStatuses[status.question.id] = status;
        });
      },
      error: (err) => {
        console.error('Error fetching question statuses:', err);
      }
    });
    // this.isLoading = true;
    // forkJoin({ questions: this.questionService()!.getQuestions(), categories: this.categoryService.getCategories(), questionStatuses: this.questionStatusService.getAllQuestionStatuses() }).subscribe({
    //   next: ({ questions, categories, questionStatuses }) => {
    //     this.isLoading = false;
    //     this.questions = questions.map(q => {
    //       return { ...q, patternName: q.patternName || 'Miscellaneous' };
    //     });
    //     this.filteredQuestions = this.questions;
    //     this.categories = [{ id: 'all', name: 'All' } as ICategory].concat(categories.data);
    //     questionStatuses.data.forEach(status => {
    //       this.questionStatuses[status.question.id] = status;
    //     });
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error('Error fetching question statuses:', err);
    //   }
    // })
  }

  openMoveQuestionToSheetDialog(questionId: number) {
    this._dialogService.open(SaveQuestionToSheet, {
      header: 'Move Question to Sheet',
      modal: true,
      width: 'min(90%, 600px)',
      closable: true,
      data: { questionId: questionId }
    })
  }

  filterByCategory(categoryId: number | 'all') {
    this.selectedCategory = categoryId;
    this.filteredQuestions = this.questions.filter(q => (q.categoryId === categoryId || categoryId === 'all'));
  }
  getSeverity(status: string) {
    switch (status) {
      case 'EASY':
        return 'success';

      case 'MED':
        return 'warn';

      case 'HARD':
        return 'danger';

      default:
        return null;
    }
  }

  toggleMarkForRevision(problemId: number) {
    const isMarked = !this.questionStatuses[problemId]?.isMarkedForRevision;
    const status: UserQuestionStatusDto = {
      questionId: problemId,
      isMarkedForRevision: isMarked,
    }
    this.questionStatuses[problemId] = { ...this.questionStatuses[problemId], isMarkedForRevision: isMarked } as IUserQuestionStatus;
    this.questionStatusService.updateQuestionStatus(status).subscribe({
      next: (res) => {
        console.log('Question marked for revision successfully');
      },
      error: (err) => {
        console.error('Error marking question for revision:', err);
      }
    });
  }

  toggleSolved(problemId: number) {
    const isSolved = !this.questionStatuses[problemId]?.isSolved;
    const status: UserQuestionStatusDto = {
      questionId: problemId,
      isSolved: isSolved,
    }
    this.questionStatuses[problemId] = { ...this.questionStatuses[problemId], isSolved: isSolved } as IUserQuestionStatus;
    this.questionStatusService.updateQuestionStatus(status).subscribe({
      next: (res) => {
        console.log('Question marked for revision successfully');
      },
      error: (err) => {
        console.error('Error marking question for revision:', err);
      }
    });
  }

  openAddNoteDialog(questionId: number) {
    const ref = this._dialogService.open(
      AddNote,
      {
        data: { note: this.questionStatuses[questionId]?.note || '', questionId: questionId },
        header: 'Add Note',
        width: 'min(90%, 800px)',
        closable: true,
        modal: true
      }
    );
    ref?.onClose.subscribe((note: string) => {
      if (note) {
        this.questionStatuses[questionId].note = note;
      }
    });
  }

  pickRandomQuestion(): void {
    this.questionService()?.pickRandom(this.selectedCategory, this.params()).subscribe({
      next: (question: Problem) => {
        window.open(question.link, '_blank');
      },
      error: (error) => {
        console.error('Error fetching random question:', error);
        alert('Failed to fetch a random question. Please try again.');
      }
    });
  }

  openEditQuestionDialog(question: Problem): void {
    const ref = this._dialogService.open(AddQuestion, {
      header: 'Edit Question',
      modal: true,
      width: 'min(90%, 600px)',
      closable: true,
      data: { question: question }
    });
    ref?.onClose.subscribe((updatedQuestion: Problem) => {
      if (updatedQuestion) {
        const index = this.questions.findIndex(q => q.id === updatedQuestion.id);
        if (index !== -1) {
          this.questions[index] = { ...this.questions[index], ...updatedQuestion };
          this.filterByCategory(this.selectedCategory); // Refresh the filtered list
        }
      }
    });
  }
}
