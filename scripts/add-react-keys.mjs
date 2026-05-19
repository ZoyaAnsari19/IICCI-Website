import fs from "fs";
import path from "path";

const dir = path.resolve("src/components");

function addKeys(content) {
  const lines = content.split("\n");
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    out.push(line);

    const mapMatch = line.match(/\.map\(\(([^)]*)\)\s*=>\s*\(?\s*$/);
    if (!mapMatch) continue;

    // Find opening JSX element (may be same line or next lines)
    let j = i;
    let combined = line;
    while (j < lines.length && !combined.includes("<")) {
      j++;
      if (j < lines.length) combined += "\n" + lines[j];
    }

    const tagLineIdx = j;
    const tagLine = lines[tagLineIdx];
    if (!tagLine || /\bkey=/.test(tagLine)) continue;

    const tagMatch = tagLine.match(/<(\w+)/);
    if (!tagMatch) continue;

    const params = mapMatch[1];
    let keyExpr = null;
    if (params.includes(",")) {
      keyExpr = "i";
    } else {
      const p = params.trim().split(":")[0].trim();
      if (p === "c" || p === "item" || p === "s" || p === "m" || p === "e" || p === "t" || p === "f" || p === "a" || p === "b" || p === "l" || p === "stat" || p === "o" || p === "r" || p === "v" || p === "n") {
        const keyMap = {
          c: "c.t ?? c.title ?? c.n ?? c.label ?? c.name ?? c.id ?? c.step ?? c.icon",
          item: "item.href ?? item.label ?? item",
          s: "s.step ?? s.title ?? s.l ?? s.v ?? s.state ?? s.name ?? s",
          m: "m.label ?? m.name ?? m",
          e: "`${e.day}-${e.month}-${e.year}`",
          t: "t.name",
          f: "f",
          a: "a.title",
          b: "b",
          l: "l.n ?? l",
          stat: "stat.label",
          o: "o.name",
          r: "r.region",
          v: "v.t",
          n: "n",
        };
        keyExpr = keyMap[p] || p;
      } else if (p === "_") {
        keyExpr = "i";
      } else {
        keyExpr = p;
      }
    }

    if (!keyExpr) keyExpr = "i";

    const indent = tagLine.match(/^(\s*)/)[1];
    const openTag = tagLine.trim();
    if (openTag.endsWith(">") && !openTag.endsWith("/>")) {
      const newLine = tagLine.replace(
        new RegExp(`<${tagMatch[1]}`),
        `<${tagMatch[1]} key={${keyExpr}}`,
      );
      if (tagLineIdx === i) {
        out[out.length - 1] = newLine;
      } else {
        for (let k = i + 1; k <= tagLineIdx; k++) out.push(lines[k]);
        out[out.length - (tagLineIdx - i)] = newLine;
        i = tagLineIdx;
      }
    } else if (openTag.endsWith(">") === false) {
      // multiline opening tag
      for (let k = i + 1; k < tagLineIdx; k++) out.push(lines[k]);
      const newLine = tagLine.replace(
        new RegExp(`<${tagMatch[1]}`),
        `<${tagMatch[1]} key={${keyExpr}}`,
      );
      out.push(newLine);
      i = tagLineIdx;
    }
  }

  return out.join("\n");
}

// Simpler regex-based pass per file
function addKeysSimple(content) {
  return content.replace(
    /\.map\(\((\w+)(?:,\s*i)?\)\s*=>\s*\(\s*\n(\s*)<(\w+)(?![^>]*\bkey=)/g,
    (match, param, indent, tag) => {
      const hasIndex = match.includes(", i)");
      let key;
      if (hasIndex && (param === "_" || param === "f" || param === "n")) {
        key = "i";
      } else {
        const keys = {
          item: "item.href ?? item.label",
          c: "c.t ?? c.title ?? c.n ?? c.label ?? c.name ?? c.id ?? c.step",
          s: "s.step ?? s.title ?? s.l ?? s.state ?? s.name ?? s",
          m: "m.label ?? m.name ?? m",
          e: "`${e.day}-${e.month}-${e.year}`",
          t: "t.name",
          f: "f",
          a: "a.title",
          b: "b.t ?? b",
          l: "l.n ?? l",
          stat: "stat.label",
          o: "o.name",
          p: "p.label ?? p",
          r: "r.region",
          v: "v.t",
        };
        key = keys[param] || (hasIndex ? "i" : param);
      }
      return `.map((${param}${hasIndex ? ", i" : ""}) => (\n${indent}<${tag} key={${key}}`;
    },
  );
}

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, "utf8");
  if (file === "Footer.tsx" && !content.startsWith('"use client"')) {
    content = '"use client"\n\n' + content.replace(/^"use client"\n\n?/, "");
  }
  const updated = addKeysSimple(content);
  fs.writeFileSync(fp, updated, "utf8");
  console.log("keys:", file);
}
