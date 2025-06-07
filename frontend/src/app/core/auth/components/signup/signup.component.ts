import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { BaseAuthComponent } from '../base-auth/base-auth.component';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    RouterModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent extends BaseAuthComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }
  
  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      
      this._authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          this._authService.setUser(res);
          this.handleSuccess('Signup successfully!');
          this._router.navigate(['/']);
        },
        error: (err) => this.handleError(err)
      });
    }
  }
}
