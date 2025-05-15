import { Component } from '@angular/core';
import { QuestionListComponent } from '../../shared/components/question-list/question-list.component';

@Component({
  selector: 'app-home',
  imports: [QuestionListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
