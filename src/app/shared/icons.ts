import { Component, input } from '@angular/core';

/** The few line icons the page needs, drawn inline so nothing extra is downloaded. */
@Component({
  selector: 'k-icon',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      @switch (name()) {
        @case ('download') { <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /> }
        @case ('github') { <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /> }
        @case ('upload') { <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /> }
        @case ('link') { <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" /> }
        @case ('score') {
          <path d="M3 6h18M3 10h18M3 14h18M3 18h18" stroke-width="1" />
          <ellipse cx="8" cy="16" rx="2.2" ry="1.7" fill="currentColor" transform="rotate(-20 8 16)" />
          <path d="M10 15.5V5" />
          <ellipse cx="15" cy="12" rx="2.2" ry="1.7" fill="currentColor" transform="rotate(-20 15 12)" />
          <path d="M17 11.5V3" />
        }
        @case ('keys') {
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 4v16M13 4v16M18 4v16" stroke-width="1.2" />
          <path d="M6.5 4h3v8h-3zM11.5 4h3v8h-3zM16.5 4h3v8h-3z" fill="currentColor" stroke="none" />
        }
        @case ('chip') { <rect x="6" y="6" width="12" height="12" rx="2" /><path d="M10 10h4v4h-4zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /> }
        @case ('clock') { <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /> }
        @case ('gift') { <path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" /> }
        @case ('windows') { <path d="M3 5.5 10.5 4.5v7H3zM12 4.3 21 3v8.5h-9zM3 12.5h7.5v7L3 18.5zM12 12.5h9V21l-9-1.3z" fill="currentColor" stroke="none" /> }
        @case ('gpu') { <rect x="2" y="7" width="20" height="11" rx="2" /><circle cx="9" cy="12.5" r="2.5" /><circle cx="16" cy="12.5" r="2.5" /><path d="M5 18v2" /> }
        @case ('disk') { <ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" /> }
        @case ('shield') { <path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z" /><path d="M12 8v5m0 3h.01" /> }
        @case ('wave') { <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2" /> }
        @case ('arrow') { <path d="M5 12h14m0 0-5-5m5 5-5 5" /> }
        @case ('check') { <path d="m5 12.5 4.5 4.5L19 7.5" /> }
      }
    </svg>
  `,
  host: { class: 'inline-flex shrink-0' },
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(20);
}
