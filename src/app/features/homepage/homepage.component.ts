import { Component } from '@angular/core';
import { LeagueSheetModule } from '../league-sheet/league-sheet.module';

@Component({
    selector: 'homepage',
    imports: [LeagueSheetModule],
    template: `
    <league-sheet></league-sheet>
    `,
})
export class HomepageComponent {

}
