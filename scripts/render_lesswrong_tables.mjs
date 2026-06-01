import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const inputPath = process.argv[2] ?? "lesswrong-preliminary.md";
const outDir = process.argv[3] ?? "lesswrong_assets/tables";

const markdown = readFileSync(inputPath, "utf8");
mkdirSync(outDir, { recursive: true });

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/`|\$|\\|{|}|\[|\]|\(|\)|:|,|\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\$([^$]+)\$/g, "<span class=\"math\">$1</span>");
}

function parseRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isSeparator(line) {
  return /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function isTableStart(lines, index) {
  return lines[index]?.trim().startsWith("|") && isSeparator(lines[index + 1] ?? "");
}

function previousHeading(lines, index) {
  for (let i = index - 1; i >= 0; i--) {
    const match = lines[i].match(/^(#{2,4})\s+(.+)$/);
    if (match) return match[2].trim();
  }
  return "Table";
}

function tableHtml(title, rows) {
  const [header, separator, ...body] = rows;
  const aligns = parseRow(separator).map((cell) => {
    const left = cell.startsWith(":");
    const right = cell.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    return "left";
  });
  const headers = parseRow(header);
  const bodyRows = body.map(parseRow);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --ink: #22201c;
      --muted: #6f675d;
      --rule: #ddd7cc;
      --head: #f6f1e8;
      --stripe: #fbf8f2;
      --bg: #fffdf8;
    }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: ui-serif, Georgia, Cambria, "Times New Roman", serif;
      padding: 28px;
    }
    .table-card {
      display: inline-block;
      background: #fffdf9;
      border: 1px solid var(--rule);
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(45, 36, 24, 0.08);
      overflow: hidden;
    }
    .caption {
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-weight: 650;
      font-size: 20px;
      line-height: 1.25;
      padding: 16px 18px 12px;
      border-bottom: 1px solid var(--rule);
      background: #fffaf0;
      max-width: 1180px;
    }
    table {
      border-collapse: collapse;
      font-size: 17px;
      line-height: 1.28;
      min-width: 620px;
      max-width: 1220px;
    }
    th, td {
      padding: 10px 14px;
      border-bottom: 1px solid var(--rule);
      vertical-align: middle;
      white-space: nowrap;
    }
    th {
      background: var(--head);
      color: #302b25;
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 14px;
      letter-spacing: 0;
      text-transform: none;
      font-weight: 700;
    }
    tbody tr:nth-child(even) td {
      background: var(--stripe);
    }
    tbody tr:last-child td {
      border-bottom: 0;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.92em;
      background: #f0ebe1;
      border-radius: 4px;
      padding: 1px 4px;
    }
    .math {
      font-style: italic;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="table-card">
    <div class="caption">${inlineMarkdown(title)}</div>
    <table>
      <thead>
        <tr>${headers.map((cell, i) => `<th style="text-align:${aligns[i] ?? "left"}">${inlineMarkdown(cell)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${bodyRows.map((row) => `<tr>${row.map((cell, i) => `<td style="text-align:${aligns[i] ?? "left"}">${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("\n        ")}
      </tbody>
    </table>
  </div>
</body>
</html>`;
}

const lines = markdown.split(/\r?\n/);
const manifest = [];

for (let i = 0; i < lines.length; i++) {
  if (!isTableStart(lines, i)) continue;

  const tableLines = [];
  let j = i;
  while (j < lines.length && lines[j].trim().startsWith("|")) {
    tableLines.push(lines[j]);
    j++;
  }

  const title = previousHeading(lines, i);
  const slug = slugify(title || `table-${manifest.length + 1}`);
  const stem = `table_${String(manifest.length + 1).padStart(2, "0")}_${slug}`;
  const htmlPath = join(outDir, `${stem}.html`);
  const pngPath = join(outDir, `${stem}.png`);
  writeFileSync(htmlPath, tableHtml(title, tableLines));
  manifest.push({
    index: manifest.length + 1,
    title,
    html: htmlPath,
    png: pngPath,
    startLine: i + 1,
    endLine: j,
  });
  i = j - 1;
}

writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Rendered ${manifest.length} table HTML files from ${basename(inputPath)}.`);
for (const item of manifest) {
  console.log(`${item.index}. ${item.title} -> ${item.html}`);
}
