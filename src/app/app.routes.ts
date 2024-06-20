import { Routes } from '@angular/router';
import PassoAPassoComponent from './components/passo-a-passo/passo-a-passo.component';

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
        path: 'collection/zucker/:id',
        title: 'NFT',
        loadComponent: () => import('./pages/collection/nft/nft.component')
    },
    {
        path: 'passo-a-passo',
        component: PassoAPassoComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];
