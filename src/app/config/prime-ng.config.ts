import { EnvironmentProviders, Provider } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import {  } from "@primeng/themes/";

export const primeNgConfig: Array<Provider | EnvironmentProviders> = [
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Material,
            options: {
                darkModeSelector: '.liga-s-dark',
            }
        },
        ripple: true,
    })
];
