import { Component } from '@angular/core';
import { QuestionListComponent } from '../../shared/components/question-list/question-list.component';
import { TabsModule } from 'primeng/tabs';
import { RevisionComponent } from './components/revision/revision.component';
import { PracticeComponent } from './components/practice/practice.component';
@Component({
  selector: 'app-home',
  imports: [
    QuestionListComponent,
    TabsModule,
    RevisionComponent,
    PracticeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
