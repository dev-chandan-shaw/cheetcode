import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'practice',
  },
  {
     path: '',
    component: LayoutComponent,
    children: [
      { path: 'practice', loadComponent: () => import('./features/practice/practice.component').then((m) => m.PracticeComponent) },
      { path: 'revision', loadComponent: () => import('./features/revision/revision.component').then((m) => m.RevisionComponent) },
      // more child routes
    ],
    canActivate: [authGuard],
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
