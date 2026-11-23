// World News in One Image — 23 November 2026 (Node 22, standard library only).
// The entry is the entry.png beside this file: a newspaper front page summing up
// Monday 23 November 2026 in six verified stories. The program checks the file
// really is a PNG, then copies it to /output/entry.png. Two runs write the same
// bytes, because the image is a fixed file, not drawn at run time.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(source);

// A PNG starts with the eight-byte signature 89 50 4E 47 0D 0A 1A 0A.
const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const isPng = signature.every((byte, index) => bytes[index] === byte);
if (!isPng) {
  throw new Error('entry.png is not a PNG file');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, 'entry.png'));
