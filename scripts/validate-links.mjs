#!/usr/bin/env node
/* =============================================================
   Mutebi Oscar Portfolio — link & asset reference validator
   Usage:  node scripts/validate-links.mjs
   Exits 0 when every local reference resolves, 1 otherwise.
   ============================================================= */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative, posix } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Only real, servable pages are validated.
// components/ is deliberately excluded: those files are reference-only
// fragments whose relative paths are written for a page at pages/<route>/,
// so they cannot resolve from components/. See components/README.md.
const SCAN_DIRS = ["pages"];
const SCAN_ROOT_FILES = ["index.html"];

/* ---------- collect html files ---------- */
function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

const files = [
  ...SCAN_ROOT_FILES.map((f) => join(ROOT, f)).filter(existsSync),
  ...SCAN_DIRS.flatMap((d) => walk(join(ROOT, d))),
];

/* ---------- extract references ---------- */
const REF_RE = /(?:href|src)\s*=\s*"([^"]+)"/gi;

const stats = { files: 0, refs: 0, local: 0, external: 0, anchors: 0, broken: [] };

for (const file of files) {
  stats.files++;
  const html = readFileSync(file, "utf8");
  const base = dirname(file);

  for (const m of html.matchAll(REF_RE)) {
    const ref = m[1].trim();
    stats.refs++;

    if (/^(https?:)?\/\//i.test(ref) || /^(mailto|tel|data|javascript):/i.test(ref)) {
      stats.external++;
      continue;
    }
    if (ref.startsWith("#") || ref === "") {
      stats.anchors++;
      continue;
    }

    stats.local++;
    const target = resolve(base, ref.split("#")[0].split("?")[0]);
    if (!existsSync(target)) {
      stats.broken.push({
        file: posix.normalize(relative(ROOT, file).split("\\").join("/")),
        ref,
        resolved: relative(ROOT, target).split("\\").join("/"),
      });
    }
  }
}

/* ---------- report ---------- */
console.log("Mutebi Oscar Portfolio — link validation");
console.log("-".repeat(52));
console.log(`HTML files scanned    : ${stats.files}`);
console.log(`Total references      : ${stats.refs}`);
console.log(`  local (checked)     : ${stats.local}`);
console.log(`  external (skipped)  : ${stats.external}`);
console.log(`  fragment (skipped)  : ${stats.anchors}`);
console.log("-".repeat(52));

if (stats.broken.length === 0) {
  console.log(`RESULT: PASS — all ${stats.local} local references resolve.`);
  process.exit(0);
}

console.log(`RESULT: FAIL — ${stats.broken.length} broken reference(s):\n`);
for (const b of stats.broken) console.log(`  ${b.file}\n    -> "${b.ref}"  (missing: ${b.resolved})`);
process.exit(1);
