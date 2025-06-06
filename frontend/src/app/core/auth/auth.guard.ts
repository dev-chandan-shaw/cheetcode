import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  if (!localStorage.getItem('user')) {
    router.navigate(['/signin']);
    return false;
  }
  return true;
};
