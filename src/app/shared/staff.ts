import { Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild } from '@angular/core';

const BARS = Array.from({ length: 46 }, (_, i) => ({
  x: 12 + i * 8,
  h: 8 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)) * 78,
  o: 0.12 + (i / 46) * 0.5,
}));

const NOTES = [
  [800, 70], [846, 60], [892, 50], [938, 60], [984, 70], [1030, 40], [1076, 50], [1122, 30], [1168, 40],
].map(([x, y], i) => ({ x, y, o: 0.75 - i * 0.06 }));

const STEM = 46;
const NOTE_CYCLE = 4.5; // seconds for the notes to be written one by one and fade together, as in the app's splash
const NOTES_START = 1.5; // the first notes are written once the staff and the sound are in

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);
/** Overshoots a little before settling: a note "lands" on the staff. */
const easeBack = (v: number) => 1 + 2.2 * Math.pow(v - 1, 3) + 1.2 * Math.pow(v - 1, 2);

/** Motion is allowed, or forced with ?movimiento to review it on a PC with reduced motion. Same rule as the script in index.html. */
export function motionAllowed(): boolean {
  return /[?&]movimiento\b/.test(location.search) || !matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Klavyra's idea in one picture: a waveform on the left becomes notation on the right, on one staff.
 * Same drawing as the app's home page. When motion is allowed it is drawn in the first time it is seen
 * (the staff lines are ruled, the sound rises, the notes are written). The notes are written `loops` times and then
 * stay; with `breathe` the sound keeps moving gently afterwards, without it the drawing comes to rest.
 */
@Component({
  selector: 'k-staff',
  template: `
    <svg #svg aria-hidden="true" focusable="false" class="k-staff-svg block h-full w-full" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid slice">
      @for (y of lines; track y) {
        <line class="k-line" x1="0" x2="1200" [attr.y1]="y" [attr.y2]="y" stroke="#cdc7b6" stroke-width=".6" />
      }
      @for (b of bars; track b.x) {
        <rect class="k-bar" [attr.x]="b.x" [attr.y]="60 - b.h / 2" width="4" [attr.height]="b.h" rx="2" fill="#1f9672" [attr.opacity]="b.o" />
      }
      @for (n of notes; track n.x) {
        <g class="k-note" fill="#10614b" [attr.opacity]="n.o">
          <ellipse class="k-head" [attr.cx]="n.x" [attr.cy]="n.y" rx="9" ry="6.5" [attr.transform]="'rotate(-20 ' + n.x + ' ' + n.y + ')'" />
          <rect class="k-stem" [attr.x]="n.x + 7" [attr.y]="n.y - stem" width="1.8" [attr.height]="stem" />
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
  protected readonly stem = STEM;

  /** How many times the notes are written; after the last one they stay on the staff. */
  readonly loops = input(2);
  /** Keep the sound bars moving after the intro (calmly). Off: the drawing stops once written. */
  readonly breathe = input(true);

  private readonly svg = viewChild.required<ElementRef<SVGSVGElement>>('svg');

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Browser only: the prerendered HTML keeps the still drawing, which is also what reduced motion gets.
    afterNextRender(() => {
      const svg = this.svg().nativeElement;
      const lines = Array.from(svg.querySelectorAll<SVGLineElement>('.k-line'));
      const bars = Array.from(svg.querySelectorAll<SVGRectElement>('.k-bar'));
      const notes = Array.from(svg.querySelectorAll<SVGGElement>('.k-note'));
      const heads = notes.map((n) => n.querySelector<SVGEllipseElement>('.k-head')!);
      const stems = notes.map((n) => n.querySelector<SVGRectElement>('.k-stem')!);
      const reduce = matchMedia('(prefers-reduced-motion: reduce)');

      let frame = 0;
      let visible = false;
      let start = -1; // set the first time the staff is on screen, so the intro plays where it is seen

      const draw = (now: number) => {
        if (start < 0) start = now;
        const t = (now - start) / 1000;

        // 1 · The five lines are ruled from left to right.
        lines.forEach((el, i) => el.setAttribute('stroke-dashoffset', (1200 * (1 - easeOut(clamp01((t - i * 0.07) / 0.9)))).toFixed(1)));

        // 2 · The sound rises bar by bar, then breathes slowly (or settles, without breathe).
        const breathe = this.breathe();
        const settle = clamp01((t - 1.4) / 1.2); // the breathing eases in after the bars have risen
        bars.forEach((el, i) => {
          const grow = easeBack(clamp01((t - 0.35 - i * 0.022) / 0.5));
          const wave = breathe ? 1 - 0.32 * settle * (1 - Math.abs(Math.sin(t * 1.15 + i * 0.32))) : 1;
          const h = BARS[i].h * grow * wave;
          el.setAttribute('height', Math.max(h, 0).toFixed(2));
          el.setAttribute('y', (60 - Math.max(h, 0) / 2).toFixed(2));
        });

        // 3 · The notes are written one by one: the head lands, the stem is drawn up. They fade and are written
        //     again `loops` times; the last time they stay.
        const loops = Math.max(1, this.loops());
        const n = t - NOTES_START;
        const last = n >= (loops - 1) * NOTE_CYCLE;
        const phase = n < 0 ? -1 : last ? n - (loops - 1) * NOTE_CYCLE : n % NOTE_CYCLE;
        const fade = phase < 0 ? 0 : last ? 1 : clamp01((NOTE_CYCLE - phase) / 0.5);
        notes.forEach((el, i) => {
          const p = phase < 0 ? 0 : clamp01((phase - i * 0.28) / 0.35);
          const { x, y, o } = NOTES[i];
          const s = 0.4 + 0.6 * easeBack(p);
          heads[i].setAttribute('transform', `rotate(-20 ${x} ${y}) translate(${x} ${y}) scale(${s.toFixed(3)}) translate(${-x} ${-y})`);
          const stem = STEM * easeOut(clamp01((phase - i * 0.28 - 0.12) / 0.3));
          stems[i].setAttribute('height', stem.toFixed(2));
          stems[i].setAttribute('y', (y - stem).toFixed(2));
          el.setAttribute('opacity', (o * p * fade).toFixed(3));
        });

        svg.classList.add('k-staff-ready');
        // Written for good and nothing left to move: stop drawing.
        const done = last && phase > NOTES.length * 0.28 + 0.6;
        if (done && !breathe) return;
        frame = requestAnimationFrame(draw);
      };

      const still = () => {
        lines.forEach((el) => el.removeAttribute('stroke-dashoffset'));
        bars.forEach((el, i) => {
          el.setAttribute('height', String(BARS[i].h));
          el.setAttribute('y', String(60 - BARS[i].h / 2));
        });
        notes.forEach((el, i) => {
          const { x, y, o } = NOTES[i];
          heads[i].setAttribute('transform', `rotate(-20 ${x} ${y})`);
          stems[i].setAttribute('height', String(STEM));
          stems[i].setAttribute('y', String(y - STEM));
          el.setAttribute('opacity', String(o));
        });
        svg.classList.add('k-staff-ready');
      };

      const sync = () => {
        cancelAnimationFrame(frame);
        if (!motionAllowed()) return still();
        lines.forEach((el) => el.setAttribute('stroke-dasharray', '1200'));
        if (visible) frame = requestAnimationFrame(draw);
      };

      // Only animate while on screen.
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(svg);
      reduce.addEventListener('change', sync);
      if (!motionAllowed()) still();

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        reduce.removeEventListener('change', sync);
      });
    });
  }
}
