import { Directive, inject, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

export interface PiTableOptions {
  ignoreUpdateKeys?: string;
}

@Directive({
  selector: '[piTableOptions]',
  standalone: true,
})
export class PiTableOptionsDirective implements OnInit {
  @Input()
  inputOptions: PiTableOptions | '' = {};

  private readonly _options: PiTableOptions = {
  };

  private readonly component = inject(Table);

  ngOnInit(): void {
    this.overrideDefaultOptions();

    this.component.rowHover = true;
    this.component.stripedRows = true;
    this.component.scrollable = true;

    if (this.canUpdated('showGridlines'))
      this.component.showGridlines = true;
  }

  private canUpdated(propName: string): boolean {
    return this._options.ignoreUpdateKeys?.includes(propName) !== true;
  }

  private overrideDefaultOptions() {
    if (!this.inputOptions) return;

    const keys = Object.keys(this.inputOptions) as (keyof PiTableOptions)[];

    for (const key of keys) {
      const val = this.inputOptions[key];

      if (typeof val !== 'undefined')
        this._options[key] = val;
    }
  }
}
