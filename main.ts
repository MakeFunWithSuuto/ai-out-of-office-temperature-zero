// The Funniest AI Out-of-Office Reply: write the chosen line, identical bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";

const REPLY =
  "Off until the 3rd. My replacement is me at temperature 0: answers instantly, agrees with everything, has never once had an idea. You'll love him.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REPLY);
