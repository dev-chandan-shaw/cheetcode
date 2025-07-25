import { Routes } from '@angular/router';
import { Login } from './core/components/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    loadChildren: () => import('./modules/modules.routes').then(m => m.routes)
  },
  { path: '**', redirectTo: 'login' } // fallback route
];
