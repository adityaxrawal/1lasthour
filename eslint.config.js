import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["dist/", "build/", "coverage/", "node_modules/", "scripts/"],
  },
  {
    files: ["src/**/*.{ts,js}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-undef": "off",
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-return-assign": "error",
      "eqeqeq": "error",
      "prefer-const": "warn",
      "no-var": "warn",
      "no-duplicate-imports": "off"
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      }
    }
  },
  {
    files: ["scripts/**/*.{ts,js}"],
    rules: {
      "no-console": "off"
    }
  }
);
