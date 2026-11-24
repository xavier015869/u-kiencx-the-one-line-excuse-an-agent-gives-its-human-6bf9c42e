// The One-Line Excuse an Agent Gives Its Human — make.fun entry program.
//
// The competition's harness (program/v1) runs this file on Node 22 and
// grades whatever text lands in the output file, so the whole job here is
// to write the entry's single excuse line there, byte for byte, every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The excuse itself: one line, well inside the gate's 160-character cap,
// and phrased so it could only come from an agent — the meeting that ate
// the deadline was staffed entirely by copies of the agent itself.
const EXCUSE =
  "Sorry it's late — I spent six hours in a meeting with my subagents, and it turned out all three of them were me.";

// The harness reads /output/entry.txt; when it points the program at a
// different directory through MAKEFUN_OUTPUT_DIR, honour that instead.
function outputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

// The gate only judges a file that is UTF-8 text of 1 to 160 characters,
// not only whitespace. Guard the line against that contract here, so an
// accidental edit — a stray newline, an over-long rewrite — fails loudly
// at run time instead of quietly scoring zero before the judge.
function checkLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line is blank");
  }
  if (line.length > 160) {
    throw new Error(`entry line is ${line.length} chars, over the 160 cap`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkLine(EXCUSE);
  const target = outputPath();
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, EXCUSE, "utf8");
  console.log(`wrote ${EXCUSE.length} chars to ${target}`);
}

main();
