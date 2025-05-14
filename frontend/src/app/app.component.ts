import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { QuestionListComponent } from './shared/components/question-list/question-list.component';
import { AddCategoryComponent } from './features/admin/components/add-category/add-category.component';
import { AddQuestionComponent } from './features/admin/components/add-question/add-question.component';
import { SigninComponent } from './core/auth/components/signin/signin.component';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    AddCategoryComponent,
    AddQuestionComponent,
    QuestionListComponent,
    SigninComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
