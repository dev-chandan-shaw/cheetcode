import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  // Skip auth for certain endpoints
  const skipAuthUrls = ['/auth/signin', '/auth/signup', '/public'];
  const shouldSkipAuth = skipAuthUrls.some(url => req.url.includes(url));
  
  if (shouldSkipAuth) {
    return next(req);
  }

  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login (optional)
  if (!token) {
    // Uncomment if you want to redirect unauthenticated users
    router.navigate(['/login']);
    return next(req);
  }

  // Clone request and add authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Handle the request and catch auth errors
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Remove user data if stored
        router.navigate(['/login']);
      }
      
      // Handle 403 Forbidden - insufficient permissions
      if (error.status === 403) {
        console.error('Access forbidden - insufficient permissions');
        // Optionally redirect to access denied page
        // router.navigate(['/access-denied']);
      }

      return throwError(() => error);
    })
  );
};
