import { Component, computed, inject, linkedSignal } from '@angular/core';
import { SavedQuestionService } from '../../../../shared/services/saved-question.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Question } from '../../../../shared/models/question';

@Component({
  selector: 'app-revision',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.scss',
})
export class RevisionComponent {
  private readonly _savedQuestionService = inject(SavedQuestionService);
  questions = linkedSignal(() => this._savedQuestionService.questions());
  markAsDone(question: Question) {
    this._savedQuestionService.removeQuestion(question);
  }
}
