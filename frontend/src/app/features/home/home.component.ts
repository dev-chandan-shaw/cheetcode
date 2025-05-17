import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { CategoryService } from '../../shared/services/category/category.service';
import { SavedQuestionService } from '../../shared/services/saved-question.service';
import { PracticeComponent } from './components/practice/practice.component';
import { RevisionComponent } from './components/revision/revision.component';
import { ImportantQuestionService } from '../../shared/services/startedQuestion.service';
@Component({
  selector: 'app-home',
  imports: [CardModule, TabsModule, RevisionComponent, PracticeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  private readonly _categoryService = inject(CategoryService);
  private readonly _savedQuestionService = inject(SavedQuestionService);
  private readonly _importantQuestionService = inject(ImportantQuestionService);

  categories =  this._categoryService.getCategories()

  ngOnInit(): void {
    this._categoryService.fetchCategories();
    this._savedQuestionService.fetchQuestions();
    this._importantQuestionService.fetchQuestions();
  }

}
