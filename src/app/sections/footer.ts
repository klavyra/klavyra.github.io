import { Component } from '@angular/core';
import { Icon } from '../shared/icons';
import { LINKS, RELEASE_NOTE } from '../shared/links';
import { Logo } from '../shared/logo';
import { Staff } from '../shared/staff';

@Component({
  selector: 'k-footer',
  imports: [Icon, Logo, Staff],
  template: `
    <!-- Last call to action: the ink card of the app, keyboard strip included. -->
    <section aria-labelledby="cta-title" class="k-section py-20 sm:py-28">
      <div class="relative overflow-hidden rounded-2xl bg-ink-2 text-surface-0 shadow-ink">
        <k-staff class="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 opacity-25 sm:h-56" />
        <div aria-hidden="true" class="k-glow pointer-events-none absolute bottom-10 left-1/2 h-40 w-[28rem] max-w-full -translate-x-1/2 bg-brass/25"></div>
        <div class="relative flex flex-col items-center px-6 py-14 text-center sm:py-20">
          <k-logo [size]="56" bars="#f7f4ec" />
          <h2 id="cta-title" class="k-display m-0 mt-6 text-4xl leading-tight sm:text-5xl">
            Tu próxima pieza empieza con <em class="text-brass">una grabación</em>
          </h2>
          <div class="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start">
            <div class="flex flex-col items-center gap-2">
              <a [href]="links.download" class="k-brass h-14 w-full px-7 text-base sm:w-auto">
                <k-icon name="windows" [size]="20" />
                Descargar para Windows
              </a>
              <span class="text-xs font-semibold text-night-200">{{ note }}</span>
            </div>
            <a [href]="links.repo" class="k-ghost-dark h-14 px-6 text-base">
              <k-icon name="github" [size]="20" />
              Ver en GitHub
            </a>
          </div>
        </div>
        <div aria-hidden="true" class="k-keys relative h-12"></div>
      </div>
    </section>

    <footer class="bg-ink text-night-200">
      <div class="k-section flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div class="max-w-sm">
          <div class="flex items-center gap-2.5 text-surface-0">
            <k-logo [size]="26" bars="#f7f4ec" />
            <span class="k-display text-xl leading-none">Klavyra</span>
          </div>
          <p class="m-0 mt-4 text-sm leading-relaxed">
            Una herramienta de estudio. Úsala con música propia, de dominio público o con permiso: descargar de YouTube u otras
            plataformas puede ir contra sus términos de uso.
          </p>
        </div>

        <nav aria-label="Enlaces del proyecto">
          <ul class="m-0 flex list-none flex-col gap-3 p-0 text-sm font-semibold">
            <li><a [href]="links.repo" class="text-surface-0 no-underline hover:text-brass">Código fuente</a></li>
            <li><a [href]="links.license" class="text-surface-0 no-underline hover:text-brass">Licencia GNU AGPL-3.0</a></li>
            <li><a [href]="links.thirdParty" class="text-surface-0 no-underline hover:text-brass">Licencias de terceros</a></li>
          </ul>
        </nav>
      </div>
      <div class="border-t border-white/10">
        <div class="k-section"><p class="m-0 py-6 text-xs leading-relaxed">
          © 2026 Johel Roque · Klavyra es software libre bajo la licencia GNU AGPL-3.0. Los componentes de terceros conservan sus
          propias licencias; los pesos de MuScriptor son de uso no comercial (CC BY-NC 4.0).
        </p></div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly links = LINKS;
  protected readonly note = RELEASE_NOTE;
}
