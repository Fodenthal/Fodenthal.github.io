import { readFileSync, writeFileSync } from "node:fs";

const markdownPath = process.argv[2] ?? "lesswrong-preliminary.md";
const manifestPath = process.argv[3] ?? "lesswrong_assets/tables/manifest.json";

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const lines = readFileSync(markdownPath, "utf8").split(/\r?\n/);

function isSeparator(line) {
  return /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function isTableStart(index) {
  return lines[index]?.trim().startsWith("|") && isSeparator(lines[index + 1] ?? "");
}

const out = [];
let tableIndex = 0;

for (let i = 0; i < lines.length; i++) {
  if (!isTableStart(i)) {
    out.push(lines[i]);
    continue;
  }

  const item = manifest[tableIndex];
  if (!item) throw new Error(`No manifest entry for table ${tableIndex + 1}`);

  while (i < lines.length && lines[i].trim().startsWith("|")) i++;
  i--;

  const imagePath = item.png.replace(/\\/g, "/");
  out.push(`![${item.title}](${imagePath})`);
  tableIndex++;
}

if (tableIndex !== manifest.length) {
  throw new Error(`Replaced ${tableIndex} tables, but manifest has ${manifest.length}`);
}

writeFileSync(markdownPath, out.join("\n"));
console.log(`Replaced ${tableIndex} markdown tables with PNG references in ${markdownPath}.`);
