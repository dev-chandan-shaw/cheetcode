import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Import NG-ZORRO Modules
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

import { IUser } from '../../../shared/models/user';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonModule, FloatLabelModule, CommonModule, InputTextModule, RouterModule, InputGroupModule, InputGroupAddonModule],
  providers: [AuthService],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = signal(false);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService); // Assuming AuthService is injected for login logic
  private _route = inject(ActivatedRoute);


  constructor() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      if (params['token']) {
        this.signinWithGoogleSuccess();
      }
    });
  }


  loginWithGoogle(): void {
    window.location.href = environment.googleOAuthRedirectUrl;
  }

  signinWithGoogleSuccess() {
    const token = this._route.snapshot.queryParamMap.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      this._authService.fetchCurrentUser(token).subscribe({
        next: (res) => {
          this._authService.setUser(res);
          this._router.navigate(['/']);
        },
        error: () => {
          this._router.navigate(['/signin']);
        }
      });
    }
  }


  submitForm() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const formData = this.loginForm.value;
      this._authService.login(formData.email, formData.password).subscribe({
        next: (response: IUser) => {
          // Handle successful login, e.g., store token and redirect
          localStorage.setItem('authToken', response.token); // Assuming the response contains a token
          localStorage.setItem('loggedInUser', JSON.stringify(response)); // Store user info
          this._router.navigate(['/home']); // Redirect to home or dashboard
          this.isLoading.set(false);
        },
        error: (error) => {
          // Handle login error, e.g., show notification
          console.error('Login failed', error);
          this.isLoading.set(false);
        }
      });
      // Handle form submission logic here
    } else {
      this.loginForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
    }
  }
}
