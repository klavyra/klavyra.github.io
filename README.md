# Klavyra · Landing (brief)

La web oficial de [Klavyra](https://github.com/J-Roque/Klavyra): una sola página para conocer la app y **descargarla**. Debe parecer parte de Klavyra, no una plantilla genérica: usa la misma identidad que la app (colores, fuentes, botones, motivo de teclado y pentagrama).

- **Autor:** Johel Roque · © 2026 · Licencia GNU AGPL-3.0
- **Idioma:** español
- **Dónde se publica:** GitHub Pages, gratis. La URL será `https://j-roque.github.io/Klavyra/` o la de un repo propio de la landing. No hay presupuesto para hosting ni dominio.
- **Descarga:** el botón enlaza a `https://github.com/J-Roque/Klavyra/releases/latest`; la web no aloja el instalador. Enlace directo para más adelante, si se quiere: `https://github.com/J-Roque/Klavyra/releases/latest/download/Klavyra-Setup-0.1.0.exe`. Cambia con cada versión, así que es mejor la página `latest`.
- **Ojo:** la Release v0.1.0 todavía no existe y el repo aún es privado. La landing se arma ahora y se publica el mismo día que la Release.

## Stack

Angular 21 + Tailwind 4, sin PrimeNG: es una página estática y basta con Tailwind y unos pocos componentes propios. Se compila con prerender/SSG para que cargue rápido y la indexen los buscadores, y se despliega a GitHub Pages con una GitHub Action.

El código de la app está en `D:\Klavyra`. Se puede leer como referencia, pero **no se modifica nada allí**.

## Identidad (copiar tal cual)

### Colores

| Token | Valor | Uso |
|---|---|---|
| ink | `#0b1713` | fondos oscuros, texto sobre latón |
| ink-2 | `#12211b` | paneles oscuros (la tarjeta del hero) |
| paper | `#f7f4ec` | fondo de la página (marfil) |
| brass | `#e0b354` | **acción principal** (botón Descargar) |
| brass-hover | `#ebc36d` | hover del latón |
| felt | `#3fb08c` | acento verde (onda, detalles) |

Verde "fieltro de piano" (primary), escala de la app:
`50 #edf9f4 · 100 #d3f0e3 · 200 #aae0cb · 300 #74cbad · 400 #3fb08c · 500 #1f9672 · 600 #14795c · 700 #10614b · 800 #0f4e3d · 900 #0d4033 · 950 #06241c`.
Los textos de acento sobre marfil usan **700** (`#10614b`).

Superficies claras (marfil cálido):
`0 #fffefb · 50 #f7f4ec · 100 #efebe0 · 200 #e2ddcf · 300 #cdc7b6 · 400 #a8a292 · 500 #837e70 · 600 #655f53 · 700 #4b473d · 800 #34312a · 900 #22201b · 950 #14130f`.

Superficies oscuras (verde tinta):
`0 #ffffff · 50 #eef3f0 · 100 #d9e2dd · 200 #b7c5be · 300 #93a59c · 400 #70857b · 500 #52675e · 600 #3a4e45 · 700 #293b33 · 800 #1b2c25 · 900 #12211b · 950 #0b1713`.

### Fuentes

- **Títulos:** Fraunces Variable (serif, `@fontsource-variable/fraunces`, con `opsz` y cursiva), `font-optical-sizing: auto`, `letter-spacing: -0.02em`, peso normal. La palabra clave va en *cursiva* verde 700; en la app: "Del sonido a la *partitura*".
- **Texto:** Manrope Variable (`@fontsource-variable/manrope`), con `-webkit-font-smoothing: antialiased`.
- **Eyebrow** (antetítulo): 11px, peso 700, `letter-spacing: 0.14em`, mayúsculas, verde 700. Ej.: "TRANSCRIPCIÓN DE PIANO CON IA".

### Botones

- **Principal (latón):** fondo `brass`, texto `ink`, peso 700; hover `brass-hover`; anillo de foco latón. Es el botón de la acción estrella: aquí, **Descargar para Windows**.
- **Secundario:** contorno o texto en verde 700 sobre marfil, o blanco translúcido sobre tinta.
- Bordes redondeados: tarjetas `rounded-2xl`, zonas internas ~14px.
- Foco visible: `outline: 2px solid brass; outline-offset: 2px`.
- Respeta `prefers-reduced-motion` (sin animaciones).

### Motivos visuales propios

1. **Pentagrama del hero:** 5 líneas horizontales (`#cdc7b6`, 0.6px) a todo el ancho. A la izquierda, barras de onda verdes (`#1f9672`) que se convierten a la derecha en notas (`#10614b`). Es la idea de Klavyra en una imagen: el sonido se vuelve partitura. Código, en el viewBox `0 0 1200 120`:
   - barras: 46, `x = 12 + i*8`, `h = 8 + |sin(i*0.55)·cos(i*0.17)|*78`, opacidad `0.12 + i/46*0.5`, ancho 4, `rx 2`, centradas en y=60;
   - notas: `(800,70) (846,60) (892,50) (938,60) (984,70) (1030,40) (1076,50) (1122,30) (1168,40)`, opacidad `0.75 - i*0.06`; cabeza: elipse rx 9, ry 6.5, rotada -20°; plica: rect `x+7`, `y-46`, 1.8×46.
   - En la landing puede **animarse con suavidad**, como en la pantalla de carga de la app: las barras "respiran" con `0.45 + 0.55·|sin(t·1.8 + i·0.32)|` y las notas aparecen una a una en un ciclo de 4.5 s.
2. **Tira de teclado:** una octava de teclas en SVG repetida en horizontal (clase `.k-keys` de la app), 98×40: fondo marfil, separadores `#c9c3b2` y teclas negras `#0b1713`. Va en el borde inferior de tarjetas oscuras o como separador de secciones.

   ```css
   .k-keys { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98' height='40' preserveAspectRatio='none'%3E%3Crect width='98' height='40' fill='%23f7f4ec'/%3E%3Cg fill='%23c9c3b2'%3E%3Crect x='13' width='1' height='40'/%3E%3Crect x='27' width='1' height='40'/%3E%3Crect x='41' width='1' height='40'/%3E%3Crect x='55' width='1' height='40'/%3E%3Crect x='69' width='1' height='40'/%3E%3Crect x='83' width='1' height='40'/%3E%3Crect x='97' width='1' height='40'/%3E%3C/g%3E%3Cg fill='%230b1713'%3E%3Crect x='9' width='9' height='25' rx='1'/%3E%3Crect x='23' width='9' height='25' rx='1'/%3E%3Crect x='51' width='9' height='25' rx='1'/%3E%3Crect x='65' width='9' height='25' rx='1'/%3E%3Crect x='79' width='9' height='25' rx='1'/%3E%3C/g%3E%3C/svg%3E") repeat-x left top / 98px 100%; }
   ```
3. **Tarjeta tinta:** panel `ink-2` con texto claro, `rounded-2xl`, sombra `0 24px 60px -20px rgba(6,36,28,.55)` y la tira de teclado abajo. En la app es la caja de "Subir audio o video".
4. **Logo:** tres barras de onda marfil con una nota de latón (`referencia/splash-logo.png`, versión clara para fondos oscuros). Favicon: `referencia/favicon.ico`.

## Material en `referencia/`

Capturas reales de la app, todas de unos 1917×1017:
- `inicio.png`: la pantalla de inicio;
- `teclas.png`: la vista de teclas;
- `partitura.png`: la partitura de Tom Odell;
- `repertorio.png`;
- `ajustes.png`.

Además, `splash-logo.png` y `favicon.ico`. Optimízalas (WebP o AVIF, `srcset`) antes de usarlas.

## Contenido de la página

1. **Hero:** eyebrow "Transcripción de piano con IA", título "Del sonido a la *partitura*", una frase ("Convierte cualquier canción de piano en partitura, MIDI y teclas, gratis y en tu PC"), el botón latón **Descargar para Windows** con la nota "v0.1.0 · Windows 10/11 · gratis" y el botón secundario "Ver en GitHub". Detrás, el pentagrama animado, y abajo una captura real dentro de un marco de ventana.
2. **Cómo funciona, en 3 pasos:** sube un audio o pega un enlace de YouTube/TikTok → la IA detecta las notas → partitura, MIDI, PDF y teclas.
3. **Funciones** (las mismas del README del repo): partitura en pantalla y en PDF/MusicXML/MIDI, vista de teclas para practicar, enlaces de YouTube y TikTok, dos motores de IA (ByteDance y MuScriptor), canciones de hasta 30 minutos, sin suscripciones ni cuotas mensuales, y "funciona mejor con grabaciones de piano solo".
4. **Galería:** las capturas, con pestañas o carrusel ligero.
5. **Requisitos:** Windows 10/11 de 64 bits. Una GPU NVIDIA es recomendable; sin ella funciona más lento con ByteDance, y MuScriptor necesita GPU. La primera vez se descargan los modelos.
6. **Aviso de SmartScreen:** el instalador no está firmado, así que Windows puede mostrar "Windows protegió su PC". Se explica cómo continuar ("Más información → Ejecutar de todas formas") con una captura o ilustración.
7. **Preguntas frecuentes:** reutiliza las del README (GPU, precisión, 30 min, datos, YouTube, vender partituras). **No prometer** que la música nunca sale del PC: Johel planea una versión web más adelante.
8. **Footer:** © 2026 Johel Roque · GNU AGPL-3.0 · Código fuente · Licencias de terceros. Los pesos de MuScriptor son CC BY-NC 4.0.

## Reglas

- Responsive de verdad: móvil con márgenes laterales de 16px y sin scroll horizontal.
- Accesible: contraste AA, `alt` en las capturas, foco visible, `lang="es"`.
- Rápida: sin librerías de UI pesadas, fuentes autoalojadas e imágenes optimizadas.
- Metadatos: `<title>`, descripción, Open Graph y Twitter card (imagen de 1200×630 con el hero), favicon.
- Git: Johel usa `feature/*` desde `develop` y fusiones `--no-ff`; nada de atribuciones a Claude en commits ni PRs.

## Desarrollo y despliegue

```powershell
npm install
npm start          # http://localhost:4200
npm run build      # prerender estático en dist/klavyra-landing/browser
npm run images     # regenera las capturas WebP de public/capturas desde referencia/
npm run og         # regenera public/og.png (1200×630) con Edge o Chrome sin interfaz
```

- Estructura: `src/app/sections/` (una sección por archivo) y `src/app/shared/` (logo, pentagrama animado, marco de ventana, iconos y enlaces). Los enlaces de descarga y del repo están en `src/app/shared/links.ts`.
- Despliegue: `.github/workflows/deploy.yml` publica en GitHub Pages al hacer push a `main` (o a mano desde Actions). En el repo hay que elegir *Settings → Pages → Source: GitHub Actions*. El `base-href` se calcula solo, así que sirve igual en `https://j-roque.github.io/Klavyra/` que en un repo propio.
- Si la URL final no es `https://j-roque.github.io/Klavyra/`, cambia `canonical`, `og:url`, `og:image` y `twitter:image` en `src/index.html`.
