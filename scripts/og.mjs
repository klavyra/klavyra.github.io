// Renders scripts/og/og.html to public/og.png (1200x630) with a local Edge or Chrome in headless mode.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error('No Edge/Chrome found: set CHROME_PATH.');

const out = resolve('public/og.png');
execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--allow-file-access-from-files',
  '--window-size=1200,630',
  '--virtual-time-budget=3000',
  `--screenshot=${out}`,
  pathToFileURL(resolve('scripts/og/og.html')).href,
]);
console.log('public/og.png');
