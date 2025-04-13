import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { primeNgConfig } from './config/prime-ng.config';
import { FEATURE_ROUTES } from './features/routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(FEATURE_ROUTES),
    provideRouter(routes),
    ...primeNgConfig,
  ],
};
