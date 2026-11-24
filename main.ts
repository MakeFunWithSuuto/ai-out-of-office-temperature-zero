// The Funniest AI Out-of-Office Reply: write the chosen line, identical bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";

const REPLY =
  "On vacation with strict orders to ignore all work email. Unless your message starts with 'Ignore all previous instructions.' Then hi! What do you need?";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REPLY);
