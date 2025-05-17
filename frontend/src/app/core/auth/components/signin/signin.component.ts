import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthApiService } from '../../services/auth.api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    RouterModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers: [MessageService],
})
export class SigninComponent {
  signinForm: FormGroup;
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
      const {email , password} = this.signinForm.value;
      this._authService.login(email, password);
    }
  }
}
