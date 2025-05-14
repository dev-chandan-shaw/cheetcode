import { Component, input } from '@angular/core';
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-card',
  imports: [CommonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCardComponent {
  question = input<Question>();
  index = input.required<number>();

  toggleBookmark() {
    alert('Bookmark toggled');
  }
}
