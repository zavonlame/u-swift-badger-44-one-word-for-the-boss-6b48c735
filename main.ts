// One Word for the Boss — u-swift-badger-44-one-word-for-the-boss-6b48c735
// Writes exactly one word describing the boss to <output dir>/entry.txt.
// Node 22 stdlib only. No network, no child_process, no Chrome, no file
// reads at runtime: the word is a literal in this file, so the program
// behaves identically whatever directory the grader starts it from.
//
// The word: "Hovercraft".
// A hovercraft floats just above the ground and never quite lands —
// exactly what the boss does over your shoulder while you work: present,
// humming, watching, never sitting down, never going away. It is a real
// word (so it reads as a word a person would actually use about their
// boss), the joke lands the moment you hear it, every office has met
// one, and hovering bosses exist in kitchens, warehouses and offices
// alike — funny, true, fresh, and it travels.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Hovercraft";

function gate(word: string): void {
  // The kit gate: /output/entry.txt must hold UTF-8 text of 1 to 30
  // characters, not only whitespace, and a single word means no spaces.
  const size = [...word].length;
  if (size < 1 || size > 30) {
    throw new Error(`boss word must be 1-30 characters, got ${size}`);
  }
  if (word.trim().length === 0) {
    throw new Error("boss word must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("boss word must be a single word with no spaces");
  }
}

function main(): void {
  gate(WORD);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, WORD, "utf8");
  // Read it back: the file the judge sees must be byte-identical to the
  // word above, with nothing appended (no trailing newline, no extra text).
  if (readFileSync(target, "utf8") !== WORD) {
    throw new Error("entry.txt round-trip mismatch");
  }
}

main();
