import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth-guard';
import { adminGuard } from '../core/guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./modules').then(m => m.Modules),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home').then((m) => m.Home)
      },
      {
        path: 'sheet',
        loadComponent: () =>
          import('./pages/sheet/sheet').then((m) => m.Sheet)
      },
      {
        path: 'sheet/:sheetId',
        loadComponent: () =>
          import('./pages/sheet-questions/sheet-questions').then((m) => m.SheetQuestions)
      },
      {
        path: 'shared-sheet/:slug',
        loadComponent: () =>
          import('./pages/sheet-questions/sheet-questions').then((m) => m.SheetQuestions)
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
        canActivate: [adminGuard],
      }
    ]
  },

];
