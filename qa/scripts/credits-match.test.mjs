import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';

const mediaDir = 'assets/exercise-media';
const shipped = readdirSync(mediaDir).filter((name) => /\.(png|webp)$/.test(name)).sort();
const map = readFileSync('src/lib/exerciseMediaMap.js', 'utf8');
const required = [...map.matchAll(/exercise-media\/([^'"]+)/g)].map((match) => match[1]);
const uniqueRequired = [...new Set(required)].sort();
const licenseDoc = readFileSync(`${mediaDir}/LICENSE-SOURCES.md`, 'utf8');
const credits = readFileSync('src/screens/CreditsScreen.js', 'utf8');

const everkinetic = [
  'barbell-neck-press-1.png',
  'barbell-neck-press-2.png',
  'bent-arm-pullover-1.png',
  'bent-arm-pullover-2.png',
  'narrow-parallel-grip-chin-ups-1.png',
  'narrow-parallel-grip-chin-ups-2.png',
  'one-arm-snatch-with-barbell-1.png',
  'one-arm-snatch-with-barbell-2.png',
  'rear-deltoid-row-barbell-1.png',
  'rear-deltoid-row-barbell-2.png',
  'wide-grip-decline-barbell-pullover-1.png',
  'wide-grip-decline-barbell-pullover-2.png',
  'wide-grip-decline-bench-press-1.png',
  'wide-grip-decline-bench-press-2.png',
];

test('every shipped still is required, and nothing else is required', () => {
  assert.deepEqual(uniqueRequired, shipped);
});

test('the licence file names every shipped still', () => {
  for (const file of shipped) {
    assert.ok(licenseDoc.includes(`\`${file}\``), file);
  }
});

test('in-app credits name the Everkinetic works that ship and the OEI set', () => {
  const pngs = shipped.filter((name) => name.endsWith('.png'));
  assert.deepEqual(pngs, everkinetic);
  const flat = credits.replace(/\s+/g, ' ');
  for (const phrase of [
    'Open Exercise Illustrations',
    'CC0 1.0',
    'Bent arm pullover',
    'one arm snatch',
    'rear deltoid row',
    'wide-grip decline bench press',
    'wide-grip decline barbell pullover',
    'narrow parallel-grip chin-up',
    'barbell neck press',
    'CC BY-SA 4.0',
  ]) {
    assert.ok(flat.includes(phrase), phrase);
  }
});
