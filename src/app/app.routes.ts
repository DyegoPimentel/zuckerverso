import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        title: 'Histórias do Brasil',
        loadComponent: () => import('./pages/home/home.component'),
    },
    {
        path: 'collection/list',
        title: 'Lista de NFT - Histórias do Brasil',
        loadComponent: () => import('./pages/collection/list/list.component'),
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];
