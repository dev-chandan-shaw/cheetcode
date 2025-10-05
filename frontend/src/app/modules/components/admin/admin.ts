import { Component, inject, signal } from '@angular/core';
import { IUnapprovedQuestion, QuestionDifficulty, TagSeverity } from '../../../shared/models/interface';
import { QuestionService } from '../../../shared/services/question.service';
import { MessageService } from 'primeng/api';
import { Problem } from '../../../shared/components/question-grid/question-grid';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { Chip } from "primeng/chip";

@Component({
  selector: 'app-admin',
  imports: [CardModule, CommonModule, TagModule, ProgressSpinner, ButtonModule, Chip],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

  unapprovedQuestions = signal<IUnapprovedQuestion[]>([]);
  isLoading = signal<boolean>(false);
  private _questionService = inject(QuestionService);
  private _messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadUnapprovedQuestions();
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
