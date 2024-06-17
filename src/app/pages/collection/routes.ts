import { Routes } from '@angular/router';

export default [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'collection/list',
        children: [
            {
                path: 'collection/list',
                title: 'Lista de NFT ',
                loadChildren: () => import('../../pages/collection/list/list.component'),
            },
            {
                path: 'collection/nft/',
                title: 'NFT',
                loadComponent: () => import('../../pages/collection/nft/nft.component'),
            },
        ]
    }
]