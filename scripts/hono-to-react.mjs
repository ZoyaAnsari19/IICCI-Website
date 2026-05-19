import fs from "fs";
import path from "path";

const SRC_COMPONENTS = String.raw`c:\Users\Truelink\Downloads\src (2)\src\components`;
const DST_COMPONENTS = path.resolve("src/components");

const SVG_ATTRS = [
  ["stroke-width", "strokeWidth"],
  ["stroke-linecap", "strokeLinecap"],
  ["stroke-linejoin", "strokeLinejoin"],
  ["stroke-dasharray", "strokeDasharray"],
  ["fill-rule", "fillRule"],
  ["clip-rule", "clipRule"],
  ["stop-color", "stopColor"],
  ["stop-opacity", "stopOpacity"],
  ["font-family", "fontFamily"],
  ["font-size", "fontSize"],
  ["font-weight", "fontWeight"],
  ["text-anchor", "textAnchor"],
];

function styleStringToObject(styleStr) {
  const props = {};
  for (const part of styleStr.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim();
    const value = trimmed.slice(colon + 1).trim();
    const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    props[camelKey] = value;
  }
  const entries = Object.entries(props)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join(", ");
  return `{ ${entries} }`;
}

function convert(content, filename) {
  let s = content;

  s = s.replace(/\bclass=/g, "className=");

  for (const [from, to] of SVG_ATTRS) {
    s = s.replace(new RegExp(`\\b${from}=`, "g"), `${to}=`);
  }

  s = s.replace(/\bcrossorigin=/g, "crossOrigin=");

  s = s.replace(/style="([^"]*)"/g, (_, styleStr) => {
    return `style={${styleStringToObject(styleStr)}}`;
  });

  if (filename === "Footer.tsx") {
    s =
      '"use client"\n\n' +
      s.replace(
        'onsubmit="event.preventDefault(); alert(\'Thank you! Welcome to the IICCI community.\')"',
        'onSubmit={(e) => { e.preventDefault(); alert("Thank you! Welcome to the IICCI community."); }}',
      );
  }

  return s;
}

if (!fs.existsSync(DST_COMPONENTS)) {
  fs.mkdirSync(DST_COMPONENTS, { recursive: true });
}

const files = fs.readdirSync(SRC_COMPONENTS).filter((f) => f.endsWith(".tsx"));
for (const file of files) {
  const raw = fs.readFileSync(path.join(SRC_COMPONENTS, file), "utf8");
  const out = convert(raw, file);
  fs.writeFileSync(path.join(DST_COMPONENTS, file), out, "utf8");
  console.log("converted", file);
}

console.log("done", files.length, "components");
