import { Component, input } from '@angular/core';

/** Klavyra's mark: three sound bars that turn into a brass note. */
@Component({
  selector: 'k-logo',
  template: `
    <svg viewBox="0 0 180 180" [attr.width]="size()" [attr.height]="size()" aria-hidden="true" focusable="false">
      <g [attr.fill]="bars()">
        <rect x="12" y="76" width="16" height="48" rx="8" opacity=".55" />
        <rect x="48" y="46" width="16" height="108" rx="8" opacity=".8" />
        <rect x="84" y="66" width="16" height="68" rx="8" />
      </g>
      <g fill="#e0b354">
        <rect x="142" y="16" width="16" height="126" rx="8" />
        <ellipse cx="126" cy="140" rx="30" ry="23" transform="rotate(-24 126 140)" />
      </g>
    </svg>
  `,
  host: { class: 'inline-flex shrink-0' },
})
export class Logo {
  readonly size = input(28);
  /** Ivory on ink (the app's splash), ink on ivory. */
  readonly bars = input('#0b1713');
}
