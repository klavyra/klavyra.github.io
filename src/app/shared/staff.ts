import { Component, ElementRef, afterNextRender, inject, viewChild, DestroyRef } from '@angular/core';

const BARS = Array.from({ length: 46 }, (_, i) => ({
  x: 12 + i * 8,
  h: 8 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)) * 78,
  o: 0.12 + (i / 46) * 0.5,
}));

const NOTES = [
  [800, 70], [846, 60], [892, 50], [938, 60], [984, 70], [1030, 40], [1076, 50], [1122, 30], [1168, 40],
].map(([x, y], i) => ({ x, y, o: 0.75 - i * 0.06 }));

const NOTE_CYCLE = 4.5;

/**
 * Klavyra's idea in one picture: a waveform on the left becomes notation on the right, on one staff.
 * Same drawing as the app's home page; animated like its splash screen when motion is allowed.
 */
@Component({
  selector: 'k-staff',
  template: `
    <svg #svg aria-hidden="true" focusable="false" class="block h-full w-full" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid slice">
      @for (y of lines; track y) {
        <line x1="0" x2="1200" [attr.y1]="y" [attr.y2]="y" stroke="#cdc7b6" stroke-width=".6" />
      }
      @for (b of bars; track b.x) {
        <rect class="k-bar" [attr.x]="b.x" [attr.y]="60 - b.h / 2" width="4" [attr.height]="b.h" rx="2" fill="#1f9672" [attr.opacity]="b.o" />
      }
      @for (n of notes; track n.x) {
        <g class="k-note" fill="#10614b" [attr.opacity]="n.o">
          <ellipse [attr.cx]="n.x" [attr.cy]="n.y" rx="9" ry="6.5" [attr.transform]="'rotate(-20 ' + n.x + ' ' + n.y + ')'" />
          <rect [attr.x]="n.x + 7" [attr.y]="n.y - 46" width="1.8" height="46" />
        </g>
      }
    </svg>
  `,
  host: { class: 'block' },
})
export class Staff {
  protected readonly lines = [20, 40, 60, 80, 100];
  protected readonly bars = BARS;
  protected readonly notes = NOTES;

  private readonly svg = viewChild.required<ElementRef<SVGSVGElement>>('svg');

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Browser only: the prerendered HTML keeps the still drawing, which is also what reduced motion gets.
    afterNextRender(() => {
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      const svg = this.svg().nativeElement;
      const bars = Array.from(svg.querySelectorAll<SVGRectElement>('.k-bar'));
      const notes = Array.from(svg.querySelectorAll<SVGGElement>('.k-note'));
      let frame = 0;
      let visible = true;
      const start = performance.now();

      const draw = (now: number) => {
        const t = (now - start) / 1000;
        bars.forEach((el, i) => {
          const h = BARS[i].h * (0.45 + 0.55 * Math.abs(Math.sin(t * 1.8 + i * 0.32)));
          el.setAttribute('height', h.toFixed(2));
          el.setAttribute('y', (60 - h / 2).toFixed(2));
        });
        const phase = t % NOTE_CYCLE;
        const fade = Math.min(Math.max((NOTE_CYCLE - phase) / 0.5, 0), 1);
        notes.forEach((el, i) => {
          const appear = Math.min(Math.max((phase - i * 0.28) / 0.35, 0), 1);
          el.setAttribute('opacity', (NOTES[i].o * appear * fade).toFixed(3));
        });
        frame = requestAnimationFrame(draw);
      };

      const reset = () => {
        bars.forEach((el, i) => {
          el.setAttribute('height', String(BARS[i].h));
          el.setAttribute('y', String(60 - BARS[i].h / 2));
        });
        notes.forEach((el, i) => el.setAttribute('opacity', String(NOTES[i].o)));
      };

      const sync = () => {
        cancelAnimationFrame(frame);
        if (motion.matches || !visible) {
          if (motion.matches) reset();
          return;
        }
        frame = requestAnimationFrame(draw);
      };

      // Stop drawing when the staff is off screen.
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(svg);
      motion.addEventListener('change', sync);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        motion.removeEventListener('change', sync);
      });
    });
  }
}
