import { Routes } from '@angular/router';
import { Login } from './core/components/login/login';
import { authGuard } from './core/guards/auth-guard';
import { SignupComponent } from './core/components/signup/signup.component';
import { guestGuard } from './core/guards/guest-guard-guard';

export const routes: Routes = [
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'register', component: SignupComponent, canActivate: [guestGuard] },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/modules.routes').then(m => m.ROUTES)
    },
    { path: '**', redirectTo: 'login' } // fallback route
];
