import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./core/auth/components/signin/signin.component').then(
        (m) => m.SigninComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./core/auth/components/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
