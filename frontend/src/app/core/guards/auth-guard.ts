import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
  if (!token) {
    // Redirect to login page if not authenticated
    window.location.href = '/login';
    return false;
  }
  return true;
};
