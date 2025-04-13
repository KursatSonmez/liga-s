import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'not-found',
    template: `
    <h1>404</h1>
    <h2>Not Found</h2>
    <p>Aradığınız içerik bulunamadı!</p>
    <a href="/">Anasayfaya Dön</a>
    `,
    styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {

}
