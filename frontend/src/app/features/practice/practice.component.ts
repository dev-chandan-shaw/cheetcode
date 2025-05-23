import {
  Component,
  inject,
  input,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { QuestionCardComponent } from '../../shared/components/question-card/question-card.component';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Category } from '../../shared/models/category';
import { Question } from '../../shared/models/question';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../shared/services/category/category.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { SavedQuestionService } from '../../shared/services/saved-question.service';
import { ImportantQuestionService } from '../../shared/services/startedQuestion.service';
import { Router } from '@angular/router';
import { QuestionNoteService } from '../../shared/services/question-note.service';

@Component({
  selector: 'app-practice',
  imports: [
    QuestionCardComponent,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    ChipModule,
    ButtonModule,
    CommonModule,
    ProgressBarModule,
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss',
})
export class PracticeComponent implements OnInit {
  private readonly _questionNoteService = inject(QuestionNoteService);
  private readonly _categoryService = inject(CategoryService);
  private readonly _savedQuestionService = inject(SavedQuestionService);
  private readonly _importantQuestionService = inject(ImportantQuestionService);
  private readonly _router = inject(Router);
  categories = this._categoryService.getCategories();

  questionNoteMap = new Map<number, string>();

  filteredCategories: Category[] = [];

  selectedCategory = linkedSignal(() => this.categories()[0]);

  filteredQuestions = linkedSignal(() => this.selectedCategory().questions);

  searchQuery = '';

  isCategoriesLoading = this._categoryService.isLoadingCategories();

  ngOnInit(): void {
    this._categoryService.fetchCategories();
    this._savedQuestionService.fetchQuestions();
    this._importantQuestionService.fetchQuestions();
    this._questionNoteService.getAllNotes().subscribe((notes) => {
      this._questionNoteService.setQuestionNoteMap(notes);
    });
  }

  serchQuestion() {
    this.filteredQuestions.set(
      this.selectedCategory().questions.filter((question) => {
        return question.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      })
    );
  }

  resetFilter() {
    this.filteredQuestions.set(this.selectedCategory().questions);
    this.searchQuery = '';
  }

  selectCategory(category: Category) {
    this.selectedCategory.set(category);
  }

  getSelectedCategoryBgColor(category: Category) {
    return this.selectedCategory()?.id === category.id
      ? 'bg-[var(--p-primary-400)] text-black'
      : 'bg-zinc-700';
  }

  pickRandomQuestion() {
    const randomIndex = Math.floor(
      Math.random() * this.selectedCategory().questions.length
    );
    const question = this.selectedCategory().questions[randomIndex];
    if (question.link) {
      window.open(question.link, '_blank');
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    this.filteredCategories = this.categories().filter((category) => {
      return category.name.toLowerCase().includes(event.query.toLowerCase());
    });
  }

  getQuestionNote(question: Question) {
    return this.questionNoteMap.get(question.id) || '';
  }
}
