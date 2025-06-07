import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import environment from '../../../../environment';
import { BaseAuthComponent } from '../base-auth/base-auth.component';

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
})
export class SigninComponent extends BaseAuthComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.signinWithGoogleSuccess();
    this.signinWithGoogleFailure();
  }

   onSubmit() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      this.isLoading.set(true);
      
      this._authService.login(email, password).subscribe({
        next: (res) => {
          this._authService.setUser(res);
          this.handleSuccess('Logged in successfully');
          this._router.navigate(['/']);
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  signinWithGoogleFailure() {
    const hasError = this._route.snapshot.queryParamMap.get('error');
    if (hasError) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Authorization failed! Please try again', 
        life: 3000 
      });
    }
  }
}
