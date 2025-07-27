import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { QuestionService } from '../../../shared/services/question/question.service';
import { IQuestion, IUnapprovedQuestion, QuestionDifficulty } from '../../../shared/models/interface';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzEmptyComponent } from "ng-zorro-antd/empty";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NzCardComponent, NzTagComponent, NzButtonModule, NzGridModule, NzPopconfirmModule, NzIconModule, NzSpinComponent, NzEmptyComponent, NzEmptyComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {

  unapprovedQuestions = signal<IUnapprovedQuestion[]>([]);
  isLoading = signal<boolean>(false);
  private _questionService = inject(QuestionService);
  private _messageService = inject(NzMessageService);

  ngOnInit(): void {
    this.loadUnapprovedQuestions();
  }

  loadUnapprovedQuestions(page: number = 0): void {
    this.isLoading.set(true);
    this._questionService.getUnapprovedQuestions(page).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.unapprovedQuestions.set(response.content);
      },
      error: (error) => {
        this.isLoading.set(false);
        this._messageService.error('Failed to load unapproved questions');
        console.error('Error fetching unapproved questions:', error);
      }
    });
  }

  viewQuestion(question: IQuestion): void {
    // Logic to view question details, e.g., navigate to a question detail page
    window.open(question.link, '_blank');
  }

  approveQuestion(question: IQuestion): void {
    this.isLoading.set(true);
    this._questionService.approveQuestion(question.id).subscribe({
      next: () => {
        // Update the local state to reflect the approved question
        this.isLoading.set(false);
        const updatedQuestions = this.unapprovedQuestions().filter(q => q.id !== question.id);
        this.unapprovedQuestions.set(updatedQuestions);
        this._messageService.success('Question approved successfully');
      },
      error: (error) => {
        this.isLoading.set(false);
        this._messageService.error(error.error?.message || 'Failed to approve question');
        console.error('Error approving question:', error);
      }
    });
  }

  archiveQuestion(question: IQuestion): void {
    this.isLoading.set(true);
    this._questionService.archiveQuestion(question.id).subscribe({
      next: () => {
        this.isLoading.set(false);
        const updatedQuestions = this.unapprovedQuestions().filter(q => q.id !== question.id);
        this.unapprovedQuestions.set(updatedQuestions);
        this._messageService.success('Question archived successfully');
      },
      error: (error) => {
        this.isLoading.set(false);
        this._messageService.error(error.error?.message || 'Failed to archive question');
        console.error('Error archiving question:', error);
      }
    });
  }

  getColor(difficulty: QuestionDifficulty): string {
    switch (difficulty) {
      case QuestionDifficulty.Easy:
        return 'green';
      case QuestionDifficulty.Medium:
        return 'orange';
      case QuestionDifficulty.Hard:
        return 'red';
      default:
        return 'default';
    }
  }
}
