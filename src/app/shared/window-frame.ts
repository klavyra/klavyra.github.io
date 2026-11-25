import { Component, input } from '@angular/core';
import { Logo } from './logo';

/** A real screenshot of the app inside a slim Windows-style window, so it reads as a desktop app. */
@Component({
  selector: 'k-window',
  imports: [Logo],
  template: `
    <figure class="m-0 overflow-hidden rounded-2xl bg-ink-2 shadow-ink ring-1 ring-ink/10">
      <div class="flex h-8 items-center gap-2 px-3 text-[11px] text-night-200 sm:h-9">
        <k-logo [size]="14" bars="#f7f4ec" />
        <span class="truncate">{{ title() }}</span>
        <span aria-hidden="true" class="ml-auto flex items-center gap-4 text-night-300">
          <svg width="10" height="10" viewBox="0 0 10 10"><rect y="4.5" width="10" height="1" fill="currentColor" /></svg>
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x=".5" y=".5" width="9" height="9" fill="none" stroke="currentColor" /></svg>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" /></svg>
        </span>
      </div>
      <img
        class="block h-auto w-full bg-paper"
        [src]="'capturas/' + shot() + '-1024.webp'"
        [attr.srcset]="srcset()"
        [sizes]="sizes()"
        width="1600"
        height="825"
        [alt]="alt()"
        [attr.loading]="eager() ? 'eager' : 'lazy'"
        [attr.fetchpriority]="eager() ? 'high' : null"
        decoding="async"
      />
    </figure>
  `,
  host: { class: 'block' },
})
export class WindowFrame {
  readonly shot = input.required<string>();
  readonly alt = input.required<string>();
  readonly title = input('Klavyra');
  readonly sizes = input('(min-width: 1152px) 1104px, calc(100vw - 2rem)');
  readonly eager = input(false);

  protected srcset() {
    const s = this.shot();
    return `capturas/${s}-640.webp 640w, capturas/${s}-1024.webp 1024w, capturas/${s}-1600.webp 1600w`;
  }
}
