// Render entry.txt as an auto-reply email card (screenshots/entry.png) and write dossier.json.
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const [entryPath, chrome] = process.argv.slice(2);
const line = readFileSync(entryPath, "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#eef1f5;font-family:sans-serif">
<div style="margin:40px;padding:28px 32px;background:#fff;border-radius:10px;box-shadow:0 2px 8px #0002">
<div style="color:#667;font-size:15px">From: agent@ops.internal &nbsp;·&nbsp; Subject: Automatic reply: Re: quick question</div>
<hr style="border:0;border-top:1px solid #dde;margin:16px 0">
<div style="font-size:26px;line-height:1.45;color:#111">${esc(line)}</div>
<div style="margin-top:18px;color:#99a;font-size:13px">${[...line].length} / 160 characters · one line</div>
</div></body>`;
writeFileSync("/tmp/ooo-card.html", html);
execFileSync(chrome, ["--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
  "--window-size=1000,340", "--screenshot=screenshots/entry.png", "file:///tmp/ooo-card.html"], { stdio: "ignore" });

writeFileSync("dossier.json", JSON.stringify({
  entry: line, characters: [...line].length,
  entrypoint: "main.ts writes the line above to /output/entry.txt (same bytes every run)",
}, null, 1) + "\n");
