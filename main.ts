import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { RANT } from './rant.ts';

// Write exactly one short rant to /output/entry.txt. The gate accepts UTF-8
// text of 1-400 characters that is not only whitespace, so check those
// constraints here before anything reaches the judge. An angry judge wants the
// punch to land fast, so the rant stays a single paragraph and a word-count
// guard keeps it from wandering past a natural spoken outburst.
const text = RANT;
const size = [...text].length;
if (size < 1 || size > 400) {
  throw new Error(`a rant must be 1-400 characters, got ${size}`);
}
if (!text.trim()) {
  throw new Error('the rant must not be only whitespace');
}
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('the rant must be a single paragraph with no control characters');
}
const words = text.trim().split(/\s+/).length;
if (words < 30 || words > 120) {
  throw new Error(`a short rant is expected, got ${words} words`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-character, ${words}-word rant to ${target}`);
