import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        title: 'Bem vindo ao ZuckerVerso',
        loadComponent: () => import('./pages/home/home.component'),
    },
    {
        path: 'collection/list',
        title: 'Lista de NFT ',
        loadComponent: () => import('./pages/collection/list/list.component'),
    },
    {
        path: 'collection/nft/:id',
        title: 'NFT',
        loadComponent: () => import('./pages/collection/nft/nft.component')
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];
