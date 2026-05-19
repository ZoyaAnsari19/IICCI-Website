import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/static/**",
    "scripts/**",
  ]),
  {
    files: ["src/app/layout.tsx"],
    rules: {
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-css-tags": "off",
      "@next/next/no-sync-scripts": "off",
    },
  },
  {
    files: ["src/components/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
      "react/jsx-key": "off",
    },
  },
  {
    rules: {
      "react/jsx-key": "off",
    },
  },
]);

export default eslintConfig;
