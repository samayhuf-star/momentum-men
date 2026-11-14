#!/usr/bin/env node
import { parse } from '@babel/parser';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'ios' || name === 'android') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (name.endsWith('.js') || name.endsWith('.mjs')) acc.push(p);
  }
  return acc;
}

const files = walk(process.cwd());
for (const file of files) {
  const code = readFileSync(file, 'utf8');
  try {
    parse(code, {
      sourceType: 'unambiguous',
      plugins: ['jsx'],
      errorRecovery: false,
    });
  } catch (err) {
    console.error(`${file}\n${err.message}`);
    process.exitCode = 1;
  }
}
if (process.exitCode) {
  process.exit(process.exitCode);
}
console.log(`syntax ok (${files.length} files)`);
