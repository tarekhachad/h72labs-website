import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // NOTE: globalIgnores REPLACES eslint-config-next's defaults rather than
  // extending them, so everything to skip must be listed here explicitly.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Not ours to lint. Without these, bare `eslint` walks ~6,700 vendored JS
    // files under .obsidian/ and reports thousands of errors, which made
    // `npm run lint` useless and trained everyone to run `eslint src` instead.
    ".obsidian/**",
    "node_modules/**",
    ".agents/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
