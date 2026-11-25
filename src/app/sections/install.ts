import { Component } from '@angular/core';
import { Icon } from '../shared/icons';
import { LINKS } from '../shared/links';

/** What the PC needs, and how to get past SmartScreen: the installer is not signed. */
@Component({
  selector: 'k-install',
  imports: [Icon],
  template: `
    <section id="instalar" aria-labelledby="install-title" class="k-section py-20 sm:py-28">
      <div class="max-w-2xl">
        <p class="k-eyebrow m-0 mb-3">Instalar</p>
        <h2 id="install-title" class="k-display m-0 text-4xl leading-tight text-ink sm:text-5xl">
          Antes de <em class="text-primary-700">descargar</em>
        </h2>
        <p class="m-0 mt-4 text-lg leading-relaxed text-surface-700">
          Descarga el instalador desde GitHub y ejecútalo. No pide permisos de administrador.
        </p>
      </div>

      <div class="mt-12 grid gap-5 lg:grid-cols-5">
        <!-- Requirements -->
        <div class="rounded-2xl bg-surface-0 p-6 ring-1 ring-surface-200 sm:p-7 lg:col-span-2">
          <h3 class="k-display m-0 text-2xl text-ink">Requisitos</h3>
          <ul class="m-0 mt-6 flex list-none flex-col gap-5 p-0">
            @for (r of requirements; track r.title) {
              <li class="flex gap-4">
                <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700"><k-icon [name]="r.icon" /></span>
                <span>
                  <strong class="block font-bold text-ink">{{ r.title }}</strong>
                  <span class="mt-1 block text-sm leading-relaxed text-surface-700">{{ r.text }}</span>
                </span>
              </li>
            }
          </ul>
        </div>

        <!-- SmartScreen -->
        <div class="flex flex-col overflow-hidden rounded-2xl bg-ink-2 text-surface-0 shadow-ink lg:col-span-3">
          <div class="p-6 sm:p-7">
            <div class="flex items-center gap-3">
              <span class="grid size-10 place-items-center rounded-xl bg-brass/15 text-brass"><k-icon name="shield" /></span>
              <h3 class="k-display m-0 text-2xl">Si aparece «Windows protegió su PC»</h3>
            </div>
            <p class="m-0 mt-4 leading-relaxed text-night-200">
              El instalador todavía no tiene firma digital (cuesta dinero cada año), así que Windows SmartScreen puede avisarte la
              primera vez. Es normal en programas pequeños y gratuitos. Para continuar:
            </p>

            <ol class="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2">
              <li>
                <p class="m-0 mb-3 text-sm font-semibold text-night-100"><span class="text-brass">1.</span> Pulsa <strong>Más información</strong></p>
                <div aria-hidden="true" class="rounded-xl bg-[#1d3b5e] p-4 text-[13px] leading-snug text-white shadow-lg">
                  <p class="m-0 text-base font-semibold">Windows protegió su PC</p>
                  <p class="m-0 mt-2 text-white/80">SmartScreen de Microsoft Defender impidió el inicio de una aplicación no reconocida…</p>
                  <p class="m-0 mt-2"><span class="rounded px-1 py-0.5 underline ring-2 ring-brass">Más información</span></p>
                  <div class="mt-6 flex justify-end">
                    <span class="rounded border border-white/60 px-4 py-1">No ejecutar</span>
                  </div>
                </div>
              </li>
              <li>
                <p class="m-0 mb-3 text-sm font-semibold text-night-100"><span class="text-brass">2.</span> Pulsa <strong>Ejecutar de todas formas</strong></p>
                <div aria-hidden="true" class="rounded-xl bg-[#1d3b5e] p-4 text-[13px] leading-snug text-white shadow-lg">
                  <p class="m-0 text-base font-semibold">Windows protegió su PC</p>
                  <p class="m-0 mt-2 text-white/80">Aplicación: Klavyra-Setup-0.1.0.exe</p>
                  <p class="m-0 text-white/80">Editor: Editor desconocido</p>
                  <div class="mt-6 flex flex-wrap justify-end gap-2">
                    <span class="rounded border border-white/60 px-3 py-1 ring-2 ring-brass ring-offset-2 ring-offset-[#1d3b5e]">Ejecutar de todas formas</span>
                    <span class="rounded border border-white/60 px-3 py-1">No ejecutar</span>
                  </div>
                </div>
              </li>
            </ol>

            <p class="m-0 mt-6 text-sm leading-relaxed text-night-200">
              Descarga Klavyra solo desde
              <a [href]="links.download" class="font-semibold text-primary-200 underline underline-offset-2 hover:text-surface-0">las Releases oficiales en GitHub</a>.
              El código es abierto: puedes revisarlo o compilarlo tú mismo.
            </p>
          </div>
          <div aria-hidden="true" class="k-keys mt-auto h-10"></div>
        </div>
      </div>
    </section>
  `,
})
export class Install {
  protected readonly links = LINKS;
  protected readonly requirements = [
    { icon: 'windows', title: 'Windows 10 u 11 de 64 bits', text: 'Klavyra es una app de escritorio para Windows.' },
    {
      icon: 'gpu',
      title: 'GPU NVIDIA, recomendable',
      text: 'Sin ella también funciona con ByteDance, pero tarda bastante más. MuScriptor necesita GPU y un token gratuito de Hugging Face.',
    },
    { icon: 'disk', title: 'Unos 4 GB libres', text: 'La primera vez descarga los modelos de IA. Después ya no hace falta repetirlo.' },
    { icon: 'check', title: 'Sin permisos de administrador', text: 'El instalador funciona con una cuenta normal de Windows.' },
  ];
}
