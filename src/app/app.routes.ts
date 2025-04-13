import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/homepage',
    },
    {
        path: 'notfound',
        loadComponent: () => import('./error-pages/not-found-page.component').then(x => x.NotFoundPageComponent),
    },
    {
        path: '**',
        redirectTo: 'notfound',
    },
];
