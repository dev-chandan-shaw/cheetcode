import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-question-note',
  imports: [FormsModule, NzInputModule, NzFormModule, NzButtonModule],
  templateUrl: './question-note.html',
  styleUrl: './question-note.scss'
})
export class QuestionNote {

  inputValue = inject(NZ_MODAL_DATA).note || ''; // Default to empty string if no note is provided
  modalRef = inject(NzModalRef);

  saveNote(): void {
    this.modalRef.close(this.inputValue); // Close the modal and return the input value
  }
}
