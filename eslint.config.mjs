// eslint.config.js
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
    ]
  },

  // Базовая конфигурация ESLint
  js.configs.recommended,

  // Конфигурация для TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"], // Применяем только к TS‑файлам
    languageOptions: {
      parser: parser, // Используем TypeScript‑парсер
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.dom,  // Добавляет глобальные типы DOM (включая HTMLElementEventMap)
        ...globals.es2020
      }
    },
    plugins: {
      "@typescript-eslint": ts // Подключаем плагин TypeScript
    },
    rules: {
      // Базовые правила TypeScript
      "@typescript-eslint/no-unused-vars": "error",
      "@/no-undef": "error",

      "no-unused-vars": "off", // Отключаем JS‑правило
      "no-undef": "off"     // Отключаем JS‑правило

    }
  }
];
