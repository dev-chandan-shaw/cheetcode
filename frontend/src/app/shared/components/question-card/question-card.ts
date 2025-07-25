import { ChangeDetectorRef, Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FunctionRunnerPipe } from '../../../shared/pipes/function-runner-pipe';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { IQuestionDataService } from '../../models/question-data';
import { QuestionNote } from '../question-note/question-note';
import { QuestionService } from '../../../modules/pages/home/services/question.service';
import { CategoryService } from '../../services/category/cateogory.service';
import { QuestionStatusService } from '../../services/question-status.service';
import { IQuestion, QuestionDifficulty } from '../../models/interface';
import { IUserQuestionStatus } from '../../models/question-status';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SheetService } from '../../../modules/pages/sheet/services/sheet.service';
import { ISheet } from '../../models/sheet';
import { SheetQuestionService } from '../../../modules/pages/sheet-questions/sheet-question.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-question-card',
  imports: [NzButtonModule, NzCardModule, NzCheckboxModule, NzDividerModule, NzEmptyModule, NzFlexModule, NzGridModule, NzIconModule, NzListModule, NzSelectModule, FormsModule, NzSkeletonModule, NzSpinModule, NzTableModule, NzTagModule, NzDropDownModule, TitleCasePipe],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss'
})
export class QuestionCard {
  question = input.required<IQuestion>();
  questionNumber = input.required<number>();
  mySheets = input<ISheet[]>([]);
  questionService = input<IQuestionDataService>();
  extraParams = input<{ [key: string]: any }>({});
  isMobilelDropdownOpen = signal(false);
  isDesktopDropdownOpen = signal(false);
  selectedSheetId = signal<number | null>(null);
  isQuestionUpdating = signal(false);


  categoryService = inject(CategoryService);
  userQuestionStatusService = inject(QuestionStatusService);
  userQuestionStatusMap = this.userQuestionStatusService.statusesMap;
  modalService = inject(NzModalService);
  private _sheetQuestionService = inject(SheetQuestionService);
  private _messageService = inject(NzMessageService);

  solvedIconTheme = computed<'fill' | 'outline'>(() => {
    const status = this.userQuestionStatusMap().get(this.question().id);
    return status?.isSolved ? 'fill' : 'outline';
  });

  solvedIconBgColor = computed<string>(() => {
    const status = this.userQuestionStatusMap().get(this.question().id);
    return status?.isSolved ? '#38a149' : 'black';
  });

  revisionIconTheme = computed<'fill' | 'outline'>(() => {
    const status = this.userQuestionStatusMap().get(this.question().id);
    return status?.isMarkedForRevision ? 'fill' : 'outline';
  });

  revisionIconBgColor = computed<string>(() => {
    const status = this.userQuestionStatusMap().get(this.question().id);
    return status?.isMarkedForRevision ? '#faad14' : 'black';
  });

  markedForRevisionIconTheme = computed<'fill' | 'outline'>(() => {
    const status = this.userQuestionStatusMap().get(this.question().id);
    return status?.isMarkedForRevision ? 'fill' : 'outline';
  });

  hasNotes = computed<boolean>(() => {
    const status = this.userQuestionStatusMap().get(this.question().id);
    return !!status?.note;
  });

  openQuestionLink() {
    window.open(this.question().link, '_blank');
  }

  closeDropdown(): void {
    this.isMobilelDropdownOpen.set(false);
    this.isDesktopDropdownOpen.set(false);
  }

  addQuestionToSheet(): void {
    if (this.isQuestionUpdating()) {
      this._messageService.warning('Please wait, the question status is being updated.');
      return; // Prevent multiple clicks
    }
    if (!this.selectedSheetId()) {
      this.modalService.error({
        nzTitle: 'Error',
        nzContent: 'Please select a sheet to add the question to.'
      });
      return;
    }
    this.isQuestionUpdating.set(true);
    this.closeDropdown();
    this._sheetQuestionService.addQuestionToSheet(this.selectedSheetId()!, this.question().id).subscribe({
      next: (response) => {
        this.isQuestionUpdating.set(false);
        this._messageService.success('Question added to sheet successfully.');
      },
      error: (error: any) => {
        this._messageService.error(`${error.error}`);
        this.closeDropdown();
        this.isQuestionUpdating.set(false);
      }

    });
  }

  difficultyTagColor = computed<string>(() => {
    const difficulty = this.question().difficulty;
    switch (difficulty) {
      case QuestionDifficulty.Easy:
        return '#38a149'; // green
      case QuestionDifficulty.Medium:
        return '#faad14'; // orange
      case QuestionDifficulty.Hard:
        return '#f5222d'; // red
      default:
        return '';
    }
  });


  toggleSolved(): void {
    if (this.isQuestionUpdating()) {
      this._messageService.warning('Please wait, the question status is being updated.');
      return; // Prevent multiple clicks
    }
    const status = this.userQuestionStatusMap().get(this.question().id);
    if (!status) {
      this.userQuestionStatusMap.set(
        new Map(this.userQuestionStatusMap()).set(this.question().id, {
          id: 0,
          question: this.question(),
          isMarkedForRevision: false,
          isSolved: true,
          note: ''
        })
      );
    } 
    this.isQuestionUpdating.set(true);
    this.userQuestionStatusService.updateQuestionStatus({
      questionId: this.question().id,
      isSolved: !status?.isSolved,
      isMarkedForRevision: status?.isMarkedForRevision
    }).subscribe({
      next: (res) => {
        this.isQuestionUpdating.set(false);
      },
      error: () => {
        this.isQuestionUpdating.set(false);
        this._messageService.error('Failed to update question status.');
      }
    });
  }

  toggleRevision(): void {
    if (this.isQuestionUpdating()) {
      this._messageService.warning('Please wait, the question status is being updated.');
      return; // Prevent multiple clicks
    }
    const status = this.userQuestionStatusMap().get(this.question().id);
    this.isQuestionUpdating.set(true);
    this.userQuestionStatusService.updateQuestionStatus({
      questionId: this.question().id,
      isMarkedForRevision: !status?.isMarkedForRevision
    }).subscribe({
      next: (res) => {
        this.isQuestionUpdating.set(false);
      },
      error: () => {
        this.isQuestionUpdating.set(false);
        this._messageService.error('Failed to update question status.');
      }
    });
  }


  createComponentModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add Question Note',
      nzContent: QuestionNote,
      nzData: {note: this.userQuestionStatusMap().get(this.question().id)?.note || ''},
      nzFooter: null,
      nzWidth: 'min(600px, 95vw)',
    });
    modal.afterClose.subscribe((result) => {
      if (result || result === '') {
        this.userQuestionStatusService.updateQuestionStatus({
          questionId: this.question().id,
          note: result
        }).subscribe({
          next: () => {
            this._messageService.success('Note saved successfully.');
          },
          error: () => {
            this._messageService.error('Failed to save note.');
          }
        })
      }
    });
  }
}
