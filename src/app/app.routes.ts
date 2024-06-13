import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Histórias do Brasil',
        loadComponent: () => import('./pages/home/home.component'),
    },
    {
        path: 'collection/list',
        title: 'Lista de NFT - Histórias do Brasil',
        loadComponent: () => import('./pages/collection/list/list.component')
    }
];
