import { Component } from '@angular/core';

/** The repo's FAQ. It never promises that audio stays on the PC: a web version may come later. */
@Component({
  selector: 'k-faq',
  template: `
    <section id="preguntas" aria-labelledby="faq-title" class="border-t border-surface-200 bg-surface-100/60 py-20 sm:py-28">
      <div class="k-section grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p class="k-eyebrow m-0 mb-3">Preguntas frecuentes</p>
          <h2 id="faq-title" class="k-display m-0 text-4xl leading-tight text-ink sm:text-5xl">Lo que suelen <em class="text-primary-700">preguntar</em></h2>
        </div>

        <div class="flex flex-col gap-3">
          @for (q of faqs; track q.q) {
            <details class="group rounded-2xl bg-surface-0 ring-1 ring-surface-200 open:ring-primary-200">
              <summary class="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-5 py-4 font-bold text-ink sm:px-6 [&::-webkit-details-marker]:hidden">
                <span class="flex-1">{{ q.q }}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" class="shrink-0 text-primary-700 transition-transform group-open:rotate-45">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </summary>
              <div class="px-5 pb-5 leading-relaxed text-surface-700 sm:px-6" [innerHTML]="q.a"></div>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class Faq {
  protected readonly faqs = [
    {
      q: '¿Funciona sin tarjeta gráfica NVIDIA?',
      a: 'Sí, con el motor ByteDance. Sin GPU la IA corre en el procesador: el resultado es el mismo, pero tarda bastante más. MuScriptor sí necesita GPU. En Ajustes puedes ver si Klavyra detectó tu tarjeta.',
    },
    {
      q: '¿Qué tan precisa es la transcripción?',
      a: 'Con grabaciones de piano solo, muy buena: es para lo que están entrenados los modelos. Con bandas, voz u otros instrumentos obtienes un arreglo aproximado que conviene revisar. Puedes corregirla abriendo el MusicXML en MuseScore.',
    },
    {
      q: '¿Por qué el límite de 30 minutos?',
      a: 'Un audio más largo tarda demasiado en transcribirse y produce una partitura difícil de leer. Para piezas largas, córtalas por movimientos o secciones.',
    },
    {
      q: '¿Dónde se guardan mis transcripciones?',
      a: 'En la carpeta <code class="rounded bg-surface-100 px-1.5 py-0.5 text-[0.9em] text-ink">%LOCALAPPDATA%\\Klavyra</code> de tu PC, junto con los modelos y los registros. Al desinstalar, Klavyra pregunta si quieres borrarlos; por defecto se conservan.',
    },
    {
      q: 'Un enlace de YouTube dejó de funcionar. ¿Qué hago?',
      a: 'Los sitios de video cambian a menudo. Ve a Ajustes y pulsa <strong>Actualizar</strong> en «Descargador de enlaces».',
    },
    {
      q: '¿Puedo vender o publicar las partituras que obtengo?',
      a: 'Solo si tienes derechos sobre la música: tus propias composiciones u obras de dominio público (Bach, Beethoven, Chopin…). Si la canción tiene derechos de autor, no puedes venderla ni publicarla; el uso personal depende de las leyes de tu país.',
    },
    {
      q: '¿Es gratis de verdad?',
      a: 'Sí. Klavyra no tiene suscripciones ni cuotas mensuales, y su código es software libre bajo la licencia GNU AGPL-3.0.',
    },
  ];
}
