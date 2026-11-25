// Turns the real screenshots in referencia/ into responsive WebP files in public/capturas/.
// The Windows title bar of each capture is cropped: the page draws its own window frame.
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SHOTS = ['teclas', 'partitura', 'inicio', 'repertorio', 'ajustes'];
const WIDTHS = [640, 1024, 1600];
const TITLE_BAR = 30;

await mkdir('public/capturas', { recursive: true });

for (const name of SHOTS) {
  const src = sharp(`referencia/${name}.png`);
  const { width, height } = await src.metadata();
  const cropped = await src.extract({ left: 0, top: TITLE_BAR, width, height: height - TITLE_BAR }).toBuffer();
  for (const w of WIDTHS) {
    const out = `public/capturas/${name}-${w}.webp`;
    const info = await sharp(cropped).resize({ width: w }).webp({ quality: 80, effort: 6 }).toFile(out);
    console.log(out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
  }
}

// A close-up of the score for the features grid: no sidebar, no transport bar.
const detail = await sharp('referencia/partitura.png').extract({ left: 330, top: 150, width: 1560, height: 390 }).toBuffer();
for (const w of WIDTHS) {
  const out = `public/capturas/partitura-detalle-${w}.webp`;
  const info = await sharp(detail).resize({ width: w }).webp({ quality: 82, effort: 6 }).toFile(out);
  console.log(out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
}
