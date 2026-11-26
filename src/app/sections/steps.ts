import { Component } from '@angular/core';

/** How it works, on an ink band that ends in the keyboard strip, like the app's upload card. */
@Component({
  selector: 'k-steps',
  template: `
    <section id="como-funciona" aria-labelledby="steps-title" class="relative overflow-hidden bg-ink-2 text-surface-0">
      <!-- Background: faint ruled paper on ink and a felt-green light from above. -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="k-ruled k-ruled-dark absolute inset-0"></div>
        <div class="k-glow absolute -top-24 left-[12%] h-72 w-[36rem] max-w-full bg-felt/20"></div>
        <div class="k-glow absolute -top-16 right-[6%] hidden h-48 w-80 bg-brass/10 md:block"></div>
      </div>
      <div class="k-section relative pb-16 pt-16 sm:pb-20 sm:pt-20">
        <p class="k-eyebrow m-0 mb-3 !text-primary-300">Cómo funciona</p>
        <h2 id="steps-title" class="k-display m-0 max-w-2xl text-4xl leading-tight sm:text-5xl">
          Tres pasos, de la grabación a <em class="text-brass">tus manos</em>
        </h2>

        <ol class="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3 md:gap-5">
          <!-- 1 · Audio -->
          <li class="flex flex-col rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
            <svg viewBox="0 0 240 72" class="mb-6 h-16 w-full" aria-hidden="true" focusable="false">
              @for (b of wave; track $index) {
                <rect [attr.x]="8 + $index * 11" [attr.y]="36 - b / 2" width="5" [attr.height]="b" rx="2.5" fill="#3fb08c" [attr.opacity]="0.35 + ($index / wave.length) * 0.6" />
              }
            </svg>
            <span class="k-eyebrow !text-primary-300">Paso 1 · Audio</span>
            <h3 class="k-display m-0 mt-2 text-2xl">Sube un audio o pega un enlace</h3>
            <p class="m-0 mt-3 leading-relaxed text-night-200">
              Un MP3, WAV, M4A o MP4 de tu PC, o un enlace de YouTube o TikTok. También puedes grabar con el micrófono.
            </p>
          </li>

          <!-- 2 · Notas -->
          <li class="flex flex-col rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
            <svg viewBox="0 0 240 72" class="mb-6 h-16 w-full" aria-hidden="true" focusable="false">
              @for (y of [16, 26, 36, 46, 56]; track y) {
                <line x1="0" x2="240" [attr.y1]="y" [attr.y2]="y" stroke="#52675e" stroke-width=".8" />
              }
              @for (b of wave.slice(0, 9); track $index) {
                <rect [attr.x]="6 + $index * 10" [attr.y]="36 - b / 2" width="4" [attr.height]="b" rx="2" fill="#3fb08c" [attr.opacity]="0.25 + $index * 0.06" />
              }
              @for (n of midNotes; track n[0]) {
                <ellipse [attr.cx]="n[0]" [attr.cy]="n[1]" rx="6" ry="4.4" fill="#74cbad" [attr.transform]="'rotate(-20 ' + n[0] + ' ' + n[1] + ')'" />
                <rect [attr.x]="n[0] + 4.6" [attr.y]="n[1] - 26" width="1.4" height="26" fill="#74cbad" />
              }
            </svg>
            <span class="k-eyebrow !text-primary-300">Paso 2 · Notas</span>
            <h3 class="k-display m-0 mt-2 text-2xl">La IA escucha cada nota</h3>
            <p class="m-0 mt-3 leading-relaxed text-night-200">
              Detecta cuándo empieza cada nota, cuánto dura, con qué fuerza suena y el pedal. Luego encuentra el pulso y reparte las manos.
            </p>
          </li>

          <!-- 3 · Resultado -->
          <li class="flex flex-col rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
            <div class="mb-6 flex h-16 flex-wrap content-center gap-2" aria-hidden="true">
              @for (f of formats; track f) {
                <span class="rounded-lg bg-brass/15 px-2.5 py-1 text-xs font-bold tracking-wide text-brass ring-1 ring-brass/30">{{ f }}</span>
              }
            </div>
            <span class="k-eyebrow !text-primary-300">Paso 3 · Resultado</span>
            <h3 class="k-display m-0 mt-2 text-2xl">Partitura, MIDI, PDF y teclas</h3>
            <p class="m-0 mt-3 leading-relaxed text-night-200">
              Practica con las teclas que caen o con la partitura, y descarga el MIDI, el MusicXML o el PDF para seguir en otro programa.
            </p>
          </li>
        </ol>
      </div>
      <div aria-hidden="true" class="k-keys relative h-12"></div>
    </section>
  `,
})
export class Steps {
  protected readonly wave = [14, 30, 22, 48, 36, 60, 28, 44, 64, 38, 52, 24, 46, 58, 32, 20, 40, 26, 12, 18];
  protected readonly midNotes = [
    [128, 46], [150, 36], [172, 41], [194, 26], [216, 31],
  ];
  protected readonly formats = ['Teclas', 'Partitura', 'MIDI', 'MusicXML', 'PDF'];
}
