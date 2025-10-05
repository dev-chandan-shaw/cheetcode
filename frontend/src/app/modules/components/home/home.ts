import { Component, inject } from '@angular/core';
import { QuestionGrid } from "../../../shared/components/question-grid/question-grid";
import { QuestionService } from '../../../shared/services/question.service';

@Component({
  selector: 'app-home',
  imports: [QuestionGrid],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  protected title = 'Home';
  protected questionService = inject(QuestionService);
}
