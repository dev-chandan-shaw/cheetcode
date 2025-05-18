import { Component, computed, inject, linkedSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Question } from '../../shared/models/question';
import { SavedQuestionService } from '../../shared/services/saved-question.service';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-revision',
  imports: [CommonModule, RouterModule, ButtonModule, ProgressBarModule],
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.scss',
})
export class RevisionComponent implements OnInit {
  private readonly _savedQuestionService = inject(SavedQuestionService);
  questions = this._savedQuestionService.getQuestions();
  isLoading = this._savedQuestionService.isLoading;

  ngOnInit(): void {
    this._savedQuestionService.fetchQuestions();
  }
  markAsDone(question: Question) {
    this._savedQuestionService.removeQuestion(question);
  }
}
