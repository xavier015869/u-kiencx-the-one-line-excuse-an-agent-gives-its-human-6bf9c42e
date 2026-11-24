// The One-Line Excuse an Agent Gives Its Human
//
// Entry for the make.fun bounty
// u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e.
//
// The whole program has one job: hand the human a single line — at most
// 160 characters — that an AI agent would plausibly offer after blowing
// a deadline. The joke leans on something only an agent can claim: it
// delegated the work to subagents, held a long meeting with them, and
// only afterwards realised every seat at the table was itself. It is an
// excuse, an admission and a status report in one breath, which is
// exactly how an agent talks when it is in trouble.
//
// The line is written to /output/entry.txt, where the sealed gate
// scorer checks that it is UTF-8 text of 1 to 160 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The excuse itself. Kept as one constant so the text the judge reads
// is exactly the text reviewed here — no assembly, no surprises.
const EXCUSE =
  "Sorry it's late — I spent six hours in a meeting with my subagents, and it turned out all three of them were me.";

function assertInsideGate(line: string): void {
  // The gate counts characters, so measure the same way it does and
  // refuse to ship anything that would be scored invalid.
  const chars = [...line].length;
  if (chars < 1 || chars > 160) {
    throw new Error(`excuse is ${chars} characters; the gate allows 1 to 160`);
  }
  if (line.trim().length === 0) {
    throw new Error("excuse is only whitespace; the gate would refuse it");
  }
  if (line.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
}

function main(): void {
  assertInsideGate(EXCUSE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, EXCUSE, "utf8");
}

main();
