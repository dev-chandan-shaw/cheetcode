import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Import NG-ZORRO Modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid'; // For layout
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../../shared/models/user';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [NzFormModule, NzInputModule, NzButtonModule, NzIconModule, NzGridModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  passwordVisible = signal(false);
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

  togglePasswordVisibility(): void {
    this.passwordVisible.set(!this.passwordVisible());
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
      const formData = this.loginForm.value;
      this._authService.login(formData.email, formData.password).subscribe({
        next: (response: IUser) => {
          // Handle successful login, e.g., store token and redirect
          localStorage.setItem('authToken', response.token); // Assuming the response contains a token
          localStorage.setItem('loggedInUser', JSON.stringify(response)); // Store user info
          this._router.navigate(['/home']); // Redirect to home or dashboard
        },
        error: (error) => {
          // Handle login error, e.g., show notification
          console.error('Login failed', error);
        }
      });
      // Handle form submission logic here
    } else {
      this.loginForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
    }
  }
}
