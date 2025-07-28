import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ICategory } from '../../models/category';
import { IQuestion, QuestionDifficulty } from '../../models/interface';
import { PageResponse } from '../../models/page-response';

import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SheetService } from '../../../modules/pages/sheet/services/sheet.service';
import { IQuestionDataService } from '../../models/question-data';
import { ISheet } from '../../models/sheet';
import { CategoryService } from '../../services/category/cateogory.service';
import { QuestionStatusService } from '../../services/question-status.service';
import { SharedSheetApiService } from '../../services/shared-sheet.api.service';
import { QuestionCard } from "../question-card/question-card";
import { QuestionNote } from '../question-note/question-note';

@Component({
  selector: 'app-questions-list',
  imports: [NzButtonModule, NzToolTipModule, NzCardModule, NzCheckboxModule, NzDividerModule, NzEmptyModule, NzFlexModule, NzGridModule, NzIconModule, NzListModule, NzSelectModule, FormsModule, NzSkeletonModule, NzSpinModule, NzTableModule, NzTagModule, NzDropDownModule, QuestionCard],
  providers: [NzModalService],
  templateUrl: './questions-list.html',
  styleUrl: './questions-list.scss'
})
export class QuestionsList implements OnInit {

  questionService = input<IQuestionDataService>();
  extraParams = input<{ [key: string]: any }>({});
  sheetName = input.required<string>();
  sheetLink = input<string | null>(null);
  isSharedSheet = computed(() => !!this.sheetLink());

  questionsResponse = signal<PageResponse<IQuestion> | null>(null);
  listOfData = computed(() => this.questionsResponse()?.content || []);
  hasMore = computed(() => this.questionsResponse()?.hasMore || false);

  selectedCategory: number | 'all' = 'all';
  mySheets = signal<ISheet[]>([]);
  loadingMore = signal(false);
  initialLoading = signal(false);

  private modal = inject(NzModalService);
  private categoryService = inject(CategoryService);
  private userQuestionStatusService = inject(QuestionStatusService);
  private readonly _sheetService = inject(SheetService);
  private _sharedSheetService = inject(SharedSheetApiService);
  private _messageService = inject(NzMessageService);

  categories = signal<ICategory[]>([]);
  userQuestionStatusMap = this.userQuestionStatusService.statusesMap;

  ngOnInit(): void {
    this.initialLoading.set(true);
    this.loadQuestionResponse(0); // Load initial page
    this.loadCategories();
    this.loadMySheets();
    this.userQuestionStatusService.getAllQuestionStatuses().subscribe();
  }

  createComponentModal(): void {
    const modal = this.modal.create<QuestionNote>({
      nzContent: QuestionNote,
      nzTitle: 'Add Question Note',
      nzFooter: null,
      nzCentered: true,
    });
  }

  onLoadMore(): void {
    if (this.loadingMore() || !this.hasMore()) return; // Prevent multiple calls
    this.loadingMore.set(true);
    const nextPage = (this.questionsResponse()?.pageNumber || 0) + 1;
    this.loadQuestionResponse(nextPage);
  }

  onCategoryChange(categoryId: number | 'all'): void {
    this.selectedCategory = categoryId;
    this.initialLoading.set(true);
    this.questionsResponse.set(null); // Clear previous results
    this.loadQuestionResponse(0); // Load page 0 for the new category
  }

  private loadQuestionResponse(pageNumber: number) {
    this.questionService()?.getQuestions(pageNumber, this.selectedCategory, this.extraParams()).subscribe({
      next: (response: PageResponse<IQuestion>) => {
        if (pageNumber > 0) {
          // This is a "load more" action, so APPEND the new data
          const currentContent = this.questionsResponse()?.content || [];
          this.questionsResponse.set({
            ...response, // Use the new page's metadata (hasMore, pageNumber, etc.)
            content: [...currentContent, ...response.content] // Combine old and new content
          });
        } else {
          // This is an initial load or category change, so REPLACE the data
          this.questionsResponse.set(response);
        }

        this.initialLoading.set(false);
        this.loadingMore.set(false);
      },
      error: () => {
        this.initialLoading.set(false);
        this.loadingMore.set(false);
      }
    });
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: ICategory[]) => {
        this.categories.set(categories);
      },
      error: () => {
        this.categories.set([]);
      }
    });
  }

  private loadMySheets() {
    this._sheetService.getAllSheets().subscribe({
      next: (sheets: ISheet[]) => {
        this.mySheets.set(sheets);
      },
      error: () => {
        this.mySheets.set([]);
      }
    });
  }

  joinSharedSheet(): void {
    this._sharedSheetService.joinSharedSheet(this.sheetLink()!).subscribe({
      next: (sheet: ISheet) => {
        this._messageService.success('Successfully joined the shared sheet.');
      },
      error: (error) => {
        this._messageService.error(error.error || 'Failed to join the shared sheet.');
      }
    });
  }

  getColor(difficulty: string): string {
    switch (difficulty) {
      case QuestionDifficulty.Easy:
        return '#52c41a'; // green
      case QuestionDifficulty.Medium:
        return '#faad14'; // orange
      case QuestionDifficulty.Hard:
        return '#f5222d'; // red
      default:
        return '';
    }
  }

  isSolved = (question: IQuestion): boolean => {
    const status = this.userQuestionStatusMap().get(question.id);
    return status?.isSolved || false;
  }

  isMarkedForRevision = (question: IQuestion): boolean => {
    const status = this.userQuestionStatusMap().get(question.id);
    return status?.isMarkedForRevision || false;
  }

  hasNote = (question: IQuestion) => {
    const status = this.userQuestionStatusMap().get(question.id);
    return !!status?.note;
  }

  getSolvedIconTheme = (question: IQuestion): 'fill' | 'outline' => {
    const status = this.userQuestionStatusMap().get(question.id);

    if (status?.isSolved) {
      return 'fill';
    } else if (status?.isMarkedForRevision) {
      return 'outline';
    }
    return 'outline';
  }

  toggleSolved(question: IQuestion): void {
    this.userQuestionStatusService.updateQuestionStatus({
      questionId: question.id,
      isSolved: !this.isSolved(question),
    }).subscribe();
  }

  pickRandomQuestion(): void {
    this.questionService()?.pickRandom(this.selectedCategory).subscribe({
      next: (question: IQuestion) => {
        window.open(question.link, '_blank');
      },
      error: (error) => {
        this._messageService.error(error.error || 'Failed to pick a random question.');
      }
    });
  }
}

