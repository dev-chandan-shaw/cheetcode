import { Component, input, linkedSignal, signal } from '@angular/core';
import { QuestionCardComponent } from '../../../../shared/components/question-card/question-card.component';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Category } from '../../../../shared/models/category';
import { Question } from '../../../../shared/models/question';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice',
  imports: [
    QuestionCardComponent,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss',
})
export class PracticeComponent {
  questions = input<Question[]>([
    {
      id: 1,
      title: 'What is your favorite color?',
      link: '',
      isBookmarked: false,
    },
    {
      id: 2,
      title: 'What is your favorite food?',
      link: '',
      isBookmarked: true,
    },
    {
      id: 3,
      title: 'What is your favorite movie?',
      link: '',
      isBookmarked: true,
    },
    {
      id: 4,
      title: 'Where do you live?',
      link: '',
      isBookmarked: false,
    },
    {
      id: 5,
      title: 'What is your hobby?',
      link: '',
      isBookmarked: false,
    },
    {
      id: 6,
      title: 'What is your favorite book?',
      link: '',
      isBookmarked: false,
    },
    {
      id: 7,
      title: 'What is your dream job?',
      link: '',
      isBookmarked: false,
    },
    {
      id: 8,
      title: 'What is your favorite season of the year?',
      link: '',
      isBookmarked: false,
    },
    {
      id: 9,
      title: 'What language do you speak?',
      link: '',
      isBookmarked: false,
    },
    {
      id: 10,
      title: 'What is your favorite sport?',
      link: '',
      isBookmarked: false,
    },
    {
      id: 11,
      title: 'What is your favorite vacation destination?',
      link: '',
      isBookmarked: false,
    },
  ]);

  categories = input.required<Category[]>();

  filteredCategories: Category[] = [];

  pickedQuestion: null | Question = null;

  selectedCategory = linkedSignal(() => this.categories()[0]);

  filteredQuestions = linkedSignal(() => this.selectedCategory().questions);

  searchQuery = '';

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
      ? 'bg-white text-zinc-800'
      : 'bg-zinc-700';
  }

  pickRandomQuestion() {
    if (this.pickedQuestion) {
      this.pickedQuestion = null;
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.selectedCategory().questions.length);
    this.pickedQuestion = this.selectedCategory().questions[randomIndex];
  }

  search(event: AutoCompleteCompleteEvent) {
    this.filteredCategories = this.categories().filter((category) => {
      return category.name.toLowerCase().includes(event.query.toLowerCase());
    });
  }
}
