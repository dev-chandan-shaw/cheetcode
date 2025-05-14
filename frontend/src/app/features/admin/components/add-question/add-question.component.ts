import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
@Component({
  selector: 'app-add-question',
  imports: [
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    FloatLabel,
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss',
})
export class AddQuestionComponent {
  categories = [
    { label: 'Select Category', value: null },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Angular', value: 'angular' },
  ];

  selectedCategory: string | null = null;
  questionTitle: string = '';
  questionLink: string = '';

  onSubmit() {
    const newQuestion = {
      category: this.selectedCategory,
      title: this.questionTitle,
      link: this.questionLink,
    };

    console.log('Submitted Question:', newQuestion);
    // Optionally reset the form
    this.selectedCategory = null;
    this.questionTitle = '';
    this.questionLink = '';
  }
}
