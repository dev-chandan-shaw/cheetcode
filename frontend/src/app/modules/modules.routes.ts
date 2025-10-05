import { Routes } from "@angular/router";
import { adminGuard } from "../core/guards/admin-guard";

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('./modules').then(m => m.Modules),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./components/home/home').then(m => m.Home),
            },
            {
                path: 'sheet',
                loadComponent: () => import('./components/sheet/sheet').then(m => m.Sheet),
            },
            {
                path: 'sheet/:sheetId',
                loadComponent: () => import('./components/sheet/sheet-question/sheet-question').then(m => m.SheetQuestion),
            },
            {
                path: 'sheet/by-slug/:sheetSlug',
                loadComponent: () => import('./components/sheet/sheet-question/sheet-question').then(m => m.SheetQuestion),
            },
            {
                path: 'admin',
                loadComponent: () => import('./components/admin/admin').then(m => m.Admin),
                canActivate: [adminGuard]
            }
        ]
    },

];