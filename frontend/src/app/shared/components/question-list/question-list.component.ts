import { Component, computed, input, signal } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { CommonModule } from '@angular/common';
import { Question } from '../../models/question';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category';
@Component({
  selector: 'app-question-list',
  imports: [
    InputGroupAddonModule,
    InputGroupModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    QuestionCardComponent,
    AutoCompleteModule,
    FormsModule,
    CommonModule,
    ChipModule,
    TagModule,
  ],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent {
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

  categories = signal<Category[]>([
    
  ]);

  filteredCategories: Category[] = [];

  pickedQuestion: null | Question = null;

  selectedCategory: null | Category = null;

  selectCategory(category: Category) {
    this.selectedCategory = category;
    console.log('Category selected:', category);
  }

  getSelectedCategoryBgColor(category: Category) {
    return this.selectedCategory?.id === category.id
      ? 'bg-white text-zinc-800'
      : 'bg-zinc-700';
  }

  pickRandomQuestion() {
    if (this.pickedQuestion) {
      this.pickedQuestion = null;
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.questions().length);
    this.pickedQuestion = this.questions()[randomIndex];
  }

  search(event: AutoCompleteCompleteEvent) {
    this.filteredCategories = this.categories().filter((category) => {
      return category.name.toLowerCase().includes(event.query.toLowerCase());
    });
  }
}
