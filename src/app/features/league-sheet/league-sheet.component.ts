import { Component, signal } from '@angular/core';

@Component({
  selector: 'league-sheet',
  templateUrl: './league-sheet.component.html',
  styleUrls: ['./league-sheet.component.scss'],
  standalone: false,
})
export class LeagueSheetComponent {
  week = signal(1);
}
