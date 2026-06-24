import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".next-arborist/**",
      ".npm-cache/**",
      "tmp/**",
      "node_modules/**",
      "next-env.d.ts",
      "lib/hazard/**",
      "components/hazard/**",
      "app/api/**",
      "app/tree-requests/**",
      "app/trends/**",
      "app/hurricane-conditions/**",
      "app/power-outages/**",
      "app/storm-impact/**",
      "app/about-data/**",
      "docs/**",
      "scripts/**"
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript")
];

export default eslintConfig;
