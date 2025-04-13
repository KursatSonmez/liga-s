import { Routes } from '@angular/router';
import { FeatureLayoutComponent } from './feature.layout.component';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: FeatureLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homepage',
      },
      {
        path: 'homepage',
        loadComponent: () => import('./homepage/homepage.component').then(x => x.HomepageComponent),
      },
    ],
  }
];
