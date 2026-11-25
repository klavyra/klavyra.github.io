import { Component, ElementRef, signal, viewChildren } from '@angular/core';
import { WindowFrame } from '../shared/window-frame';

interface Shot {
  id: string;
  tab: string;
  title: string;
  caption: string;
  alt: string;
}

/** The real screens of the app, behind an accessible tab list (arrow keys, Home and End). */
@Component({
  selector: 'k-gallery',
  imports: [WindowFrame],
  template: `
    <section id="capturas" aria-labelledby="gallery-title" class="border-y border-surface-200 bg-surface-100/60 py-20 sm:py-28">
      <div class="k-section">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div class="max-w-xl">
            <p class="k-eyebrow m-0 mb-3">Capturas</p>
            <h2 id="gallery-title" class="k-display m-0 text-4xl leading-tight text-ink sm:text-5xl">Así se ve <em class="text-primary-700">Klavyra</em></h2>
          </div>

          <div
            role="tablist"
            aria-label="Pantallas de Klavyra"
            class="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 md:rounded-xl md:bg-surface-0 md:p-1 md:ring-1 md:ring-surface-200"
          >
            @for (s of shots; track s.id; let i = $index) {
              <button
                #tab
                type="button"
                role="tab"
                [id]="'tab-' + s.id"
                [attr.aria-selected]="active() === i"
                [attr.aria-controls]="'panel-' + s.id"
                [tabIndex]="active() === i ? 0 : -1"
                (click)="select(i)"
                (keydown)="onKey($event, i)"
                class="shrink-0 cursor-pointer whitespace-nowrap rounded-lg border-0 px-4 py-2 text-sm font-semibold transition-colors"
                [class]="active() === i ? 'bg-ink-2 text-surface-0' : 'bg-transparent text-surface-700 hover:bg-surface-100 hover:text-primary-700'"
              >
                {{ s.tab }}
              </button>
            }
          </div>
        </div>

        @for (s of shots; track s.id; let i = $index) {
          <div role="tabpanel" [id]="'panel-' + s.id" [attr.aria-labelledby]="'tab-' + s.id" [hidden]="active() !== i" class="mt-10">
            <k-window [shot]="s.id" [title]="s.title" [alt]="s.alt" />
            <p class="m-0 mt-5 text-center text-surface-700">{{ s.caption }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class Gallery {
  protected readonly shots: Shot[] = [
    {
      id: 'partitura',
      tab: 'Partitura',
      title: 'Tom Odell - Another Love · Klavyra',
      caption: 'Partitura de dos pentagramas con un cursor que sigue la música.',
      alt: 'Vista de partitura de Klavyra con Another Love de Tom Odell en dos pentagramas y el cursor sobre el compás que suena.',
    },
    {
      id: 'teclas',
      tab: 'Teclas',
      title: 'Für Elise - Beethoven · Klavyra',
      caption: 'Teclas que caen sincronizadas con el audio original, con la mano derecha y la izquierda en colores distintos.',
      alt: 'Vista de teclas de Klavyra: barras verdes y doradas caen hacia un teclado de piano completo, con los controles de reproducción debajo.',
    },
    {
      id: 'inicio',
      tab: 'Inicio',
      title: 'Klavyra',
      caption: 'Empieza subiendo un audio, pegando un enlace o grabando con el micrófono.',
      alt: 'Pantalla de inicio de Klavyra: el título Del sonido a la partitura sobre un pentagrama y una tarjeta oscura con el botón Subir audio o video y un campo para pegar un enlace.',
    },
    {
      id: 'repertorio',
      tab: 'Mi repertorio',
      title: 'Mi repertorio · Klavyra',
      caption: 'Todas tus transcripciones en un solo lugar.',
      alt: 'Pantalla Mi repertorio de Klavyra con las transcripciones guardadas en tarjetas.',
    },
    {
      id: 'ajustes',
      tab: 'Ajustes',
      title: 'Ajustes · Klavyra',
      caption: 'Comprueba tu GPU, ffmpeg y MuseScore, y actualiza el descargador de enlaces.',
      alt: 'Pantalla de Ajustes de Klavyra con el estado de la GPU, ffmpeg, MuseScore y el descargador de enlaces.',
    },
  ];

  protected readonly active = signal(0);
  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  protected select(i: number) {
    this.active.set(i);
  }

  protected onKey(event: KeyboardEvent, i: number) {
    const last = this.shots.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    this.active.set(next);
    this.tabs()[next].nativeElement.focus();
  }
}
