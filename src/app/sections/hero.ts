import { Component } from '@angular/core';
import { Icon } from '../shared/icons';
import { LINKS, RELEASE_NOTE } from '../shared/links';
import { Staff } from '../shared/staff';
import { WindowFrame } from '../shared/window-frame';

@Component({
  selector: 'k-hero',
  imports: [Staff, Icon, WindowFrame],
  template: `
    <section id="inicio" aria-labelledby="hero-title" class="relative overflow-hidden">
      <div class="relative pt-12 sm:pt-20">
        <!-- The staff runs behind the title: sound on the left, notation on the right. -->
        <k-staff
          class="pointer-events-none absolute left-1/2 top-[3.6rem] aspect-[10/1] w-[190%] -translate-x-1/2 sm:top-[5.5rem] sm:w-[125%] lg:top-14 lg:aspect-auto lg:h-56 lg:w-full"
        />

        <div class="k-section relative flex flex-col items-center text-center">
          <p class="k-eyebrow m-0 mb-4">Transcripción de piano con IA</p>
          <h1 id="hero-title" class="k-display m-0 text-[2.75rem] leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
            Del sonido a la <em class="text-primary-700">partitura</em>
          </h1>
          <p class="mx-auto mb-0 mt-6 max-w-xl text-lg leading-relaxed text-surface-700 sm:text-xl">
            Convierte cualquier canción de piano en partitura, MIDI y teclas, gratis y en tu PC.
          </p>

          <div class="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start">
            <div class="flex flex-col items-center gap-2">
              <a [href]="links.download" class="k-brass h-14 w-full px-7 text-base sm:w-auto">
                <k-icon name="windows" [size]="20" />
                Descargar para Windows
              </a>
              <span class="text-xs font-semibold text-surface-600">{{ note }}</span>
            </div>
            <a [href]="links.repo" class="k-ghost h-14 px-6 text-base">
              <k-icon name="github" [size]="20" />
              Ver en GitHub
            </a>
          </div>
        </div>
      </div>

      <!-- The window sits half on ivory, half on the ink band that starts the next section. -->
      <div class="relative mt-12 sm:mt-16">
        <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1/2 bg-ink-2"></div>
        <div class="k-section relative">
          <k-window
            shot="teclas"
            title="Für Elise - Beethoven | EASY Piano Tutorial · Klavyra"
            alt="Klavyra mostrando Für Elise de Beethoven como teclas que caen sobre un teclado de piano: la mano derecha en verde, la izquierda en dorado y debajo los controles de velocidad, manos, transposición y bucle."
            [eager]="true"
          />
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly links = LINKS;
  protected readonly note = RELEASE_NOTE;
}
