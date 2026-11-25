import { Component } from '@angular/core';
import { Icon } from '../shared/icons';
import { LINKS } from '../shared/links';
import { Logo } from '../shared/logo';

@Component({
  selector: 'k-header',
  imports: [Logo, Icon],
  template: `
    <a
      href="#contenido"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-surface-0"
      >Saltar al contenido</a
    >
    <header class="sticky top-0 z-40 border-b border-surface-200/80 bg-paper/85 backdrop-blur-md">
      <div class="k-section flex h-16 items-center gap-6">
        <a href="#inicio" class="flex items-center gap-2.5 rounded-md text-ink no-underline" aria-label="Klavyra, inicio">
          <k-logo [size]="28" />
          <span class="k-display text-[1.45rem] leading-none">Klavyra</span>
        </a>
        <nav aria-label="Secciones" class="ml-auto hidden lg:block">
          <ul class="m-0 flex list-none items-center gap-1 p-0 text-sm font-semibold text-surface-700">
            @for (item of nav; track item.href) {
              <li>
                <a [href]="item.href" class="rounded-lg px-3 py-2 no-underline transition-colors hover:bg-surface-100 hover:text-primary-700">{{ item.label }}</a>
              </li>
            }
          </ul>
        </nav>
        <a [href]="links.download" class="k-brass ml-auto h-10 px-4 text-sm lg:ml-0">
          <k-icon name="download" [size]="18" />
          <span>Descargar<span class="hidden sm:inline"> para Windows</span></span>
        </a>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly links = LINKS;
  protected readonly nav = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#funciones', label: 'Funciones' },
    { href: '#capturas', label: 'Capturas' },
    { href: '#instalar', label: 'Instalar' },
    { href: '#preguntas', label: 'Preguntas' },
  ];
}
