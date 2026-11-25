import { Component } from '@angular/core';
import { Icon } from '../shared/icons';

@Component({
  selector: 'k-features',
  imports: [Icon],
  template: `
    <section id="funciones" aria-labelledby="features-title" class="k-section py-20 sm:py-28">
      <div class="max-w-2xl">
        <p class="k-eyebrow m-0 mb-3">Funciones</p>
        <h2 id="features-title" class="k-display m-0 text-4xl leading-tight text-ink sm:text-5xl">
          Todo lo que necesitas para <em class="text-primary-700">aprender</em> una pieza
        </h2>
      </div>

      <div class="mt-12 grid gap-4 md:grid-cols-6 md:gap-5">
        <!-- Score: the headline feature, with a real crop of the app. -->
        <article class="flex flex-col overflow-hidden rounded-2xl bg-surface-0 ring-1 ring-surface-200 md:col-span-4">
          <div class="p-6 sm:p-7">
            <span class="grid size-10 place-items-center rounded-xl bg-primary-50 text-primary-700"><k-icon name="score" /></span>
            <h3 class="k-display m-0 mt-5 text-2xl text-ink sm:text-3xl">Partitura en pantalla y para descargar</h3>
            <p class="m-0 mt-3 max-w-lg leading-relaxed text-surface-700">
              Dos pentagramas con un cursor que sigue la música. Descárgala en <strong class="font-bold text-ink">PDF</strong>,
              <strong class="font-bold text-ink">MusicXML</strong> (editable en MuseScore) o <strong class="font-bold text-ink">MIDI</strong>.
            </p>
          </div>
          <div class="mt-auto px-6 sm:px-7">
            <img
              class="block h-auto w-full rounded-t-xl bg-white ring-1 ring-surface-200"
              src="capturas/partitura-detalle-1024.webp"
              srcset="capturas/partitura-detalle-640.webp 640w, capturas/partitura-detalle-1024.webp 1024w, capturas/partitura-detalle-1600.webp 1600w"
              sizes="(min-width: 768px) 700px, calc(100vw - 5rem)"
              width="1600"
              height="400"
              loading="lazy"
              decoding="async"
              alt="La partitura de Another Love de Tom Odell en Klavyra, con dos pentagramas y el cursor marcando el compás que suena."
            />
          </div>
        </article>

        <!-- Keys: an ink card with the keyboard strip, the app's signature panel. -->
        <article class="flex flex-col overflow-hidden rounded-2xl bg-ink-2 text-surface-0 shadow-ink md:col-span-2">
          <div class="flex flex-1 flex-col p-6 sm:p-7">
            <span class="grid size-10 place-items-center rounded-xl bg-white/10 text-brass"><k-icon name="keys" /></span>
            <h3 class="k-display m-0 mt-5 text-2xl sm:text-3xl">Teclas para practicar</h3>
            <p class="m-0 mt-3 leading-relaxed text-night-200">
              Teclas que caen al ritmo del audio original, con cada mano en su color.
            </p>
            <ul class="m-0 mt-5 flex list-none flex-col gap-2 p-0 text-sm text-night-100">
              @for (p of practice; track p) {
                <li class="flex items-start gap-2"><k-icon name="check" [size]="18" class="mt-px text-felt" />{{ p }}</li>
              }
            </ul>
          </div>
          <div aria-hidden="true" class="k-keys h-10"></div>
        </article>

        @for (f of small; track f.title) {
          <article class="rounded-2xl bg-surface-0 p-6 ring-1 ring-surface-200 md:col-span-3">
            <span class="grid size-10 place-items-center rounded-xl bg-primary-50 text-primary-700"><k-icon [name]="f.icon" /></span>
            <h3 class="k-display m-0 mt-5 text-xl text-ink sm:text-2xl">{{ f.title }}</h3>
            <p class="m-0 mt-2 leading-relaxed text-surface-700">{{ f.text }}</p>
          </article>
        }
      </div>

      <p class="m-0 mt-6 flex items-start gap-3 rounded-2xl bg-primary-50 px-5 py-4 text-primary-900 ring-1 ring-primary-100 sm:items-center">
        <k-icon name="wave" class="mt-0.5 text-primary-700 sm:mt-0" />
        <span>
          <strong class="font-bold">Funciona mejor con grabaciones de piano solo.</strong>
          Con otros instrumentos o con voz obtienes un arreglo aproximado que conviene revisar.
        </span>
      </p>
    </section>
  `,
})
export class Features {
  protected readonly practice = ['Velocidad de 0.25× a 1×', 'Bucle A-B para repetir un pasaje', 'Transposición', 'Mano derecha, izquierda o ambas', 'Audio original o piano sintetizado'];

  protected readonly small = [
    { icon: 'link', title: 'Enlaces de YouTube y TikTok', text: 'Pega el enlace de un video y Klavyra descarga el audio por ti.' },
    { icon: 'chip', title: 'Dos motores de IA', text: 'ByteDance Piano Transcription para cualquier PC y MuScriptor para quien tiene GPU.' },
    { icon: 'clock', title: 'Hasta 30 minutos', text: 'Desde un fragmento corto hasta una pieza completa por canción.' },
    { icon: 'gift', title: 'Gratis, sin cuotas', text: 'Sin suscripciones ni cuotas mensuales. Software libre bajo la licencia AGPL-3.0.' },
  ];
}
