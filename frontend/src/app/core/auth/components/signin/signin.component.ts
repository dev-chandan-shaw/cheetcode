import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
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
    ProgressSpinnerModule,
    ToastModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers: [MessageService],
})
export class SigninComponent {
  signinForm: FormGroup;
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  isLoading = this._authService.isLoading;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
      const { email, password } = this.signinForm.value;
      this._authService.login(email, password).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User logged in successfully', life: 3000 });
          this._router.navigate(['/']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error ?? err.error.message, life: 3000 });
        }
      });

    }
  }
}
