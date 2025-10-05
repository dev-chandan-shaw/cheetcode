import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
import { AuthService } from '../../services/auth/auth.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    RouterModule,
    InputGroupModule,
    InputGroupAddonModule,
    CardModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [MessageService],
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = signal<boolean>(false);
  showPassword = false;
  private _router = inject(Router);
  authService = inject(AuthService);
  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      this.authService.register(this.signupForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token); // Assuming the response contains a token
          localStorage.setItem('loggedInUser', JSON.stringify(response)); // Store user info
          this._router.navigate(['/home']); // Redirect to home or dashboard
          this.isLoading.set(false);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully.' });
        },
        error: (error) => {
          console.error('Error registering user:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to register user.' });
          this.isLoading.set(false);
        }
      });
    }
  }
}
