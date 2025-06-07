import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import environment from '../../../../environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-base-auth',
  imports: [],
  templateUrl: './base-auth.component.html',
  styleUrl: './base-auth.component.scss'
})
export class BaseAuthComponent {
  protected readonly _authService = inject(AuthService);
  protected readonly _router = inject(Router);
  protected readonly _route = inject(ActivatedRoute);
  protected readonly messageService = inject(MessageService);

  isLoading = signal<boolean>(false);

  signinWithGoogle() {
    window.location.href = environment.googleOAuthRedirectUrl;
  }

  signinWithGoogleSuccess() {
    const token = this._route.snapshot.queryParamMap.get('token');
    if (token) {
      localStorage.setItem('token', token);
      this.isLoading.set(true);
      this._authService.fetchCurrentUser(token).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this._authService.setUser(res);
          this._router.navigate(['/']);
        },
        error: () => {
          this.isLoading.set(false);
          this._router.navigate(['/signin']);
        }
      });
    }
  }

  protected handleError(err: any) {
    this.isLoading.set(false);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: err.error ?? err.error.message,
      life: 3000
    });
  }

  protected handleSuccess(message: string) {
    this.isLoading.set(false);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  }
}
