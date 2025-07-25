import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const ROUTES_TO_SKIP = ['/login', '/signup']; // Define routes to skip the interceptor
  const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

  if (ROUTES_TO_SKIP.includes(req.url)) {
    return next(req);
  }


  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    // Handle any errors or responses here if needed
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        // Handle unauthorized access, e.g., redirect to login
        window.location.href = '/login';
      }
      throw error;
    })
  );
};
