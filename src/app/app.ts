import { Component } from '@angular/core';
import { Faq } from './sections/faq';
import { Features } from './sections/features';
import { Footer } from './sections/footer';
import { Gallery } from './sections/gallery';
import { Header } from './sections/header';
import { Hero } from './sections/hero';
import { Install } from './sections/install';
import { Steps } from './sections/steps';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Steps, Features, Gallery, Install, Faq, Footer],
  template: `
    <k-header />
    <main id="contenido">
      <k-hero />
      <k-steps />
      <k-features />
      <k-gallery />
      <k-install />
      <k-faq />
    </main>
    <k-footer />
  `,
})
export class App {}
