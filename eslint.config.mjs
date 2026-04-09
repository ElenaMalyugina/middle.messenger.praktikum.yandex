import js from "@eslint/js";
import globals from "globals";
import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  // Игнорирование служебных директорий
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**postcss.config.js",
      "vite.config.ts"
    ]
  },

  // Базовая конфигурация ESLint
  js.configs.recommended,

  // Конфигурация для TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: "./tsconfig.json", // Указываем путь к tsconfig.json
        tsconfigRootDir: import.meta.dirname // Корень проекта
      },
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.dom,
        ...globals.es2020
      }
    },
    plugins: {
      "@typescript-eslint": ts
    },
    rules: {
      // Базовые правила TypeScript
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "@/no-undef": "error", // Исправленное имя правила
      "no-unused-vars": "off", // Отключаем JS‑правило
      "no-undef": "off"      // Отключаем JS‑правило
    }
  }
];
