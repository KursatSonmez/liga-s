import { Routes } from '@angular/router';
import { FeatureLayoutComponent } from './feature.layout.component';
import { LeagueService } from './shared/league.service';
import { FixtureService } from './shared/fixture.service';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: FeatureLayoutComponent,
    providers: [LeagueService, FixtureService],
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
      {
        path: 'fixture',
        loadComponent: () => import('./fixture/fixture.component').then(x => x.FixtureComponent),
      }
    ],
  }
];
