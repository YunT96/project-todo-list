// eslint.config.mjs
import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  js.configs.recommended,
  ...compat.extends('airbnb-base'),
  {
    rules: {
      // You can add or override rules here
      // For example:
      // 'no-console': 'warn',
      "import/no-named-as-default": "off",
    },
  },
];