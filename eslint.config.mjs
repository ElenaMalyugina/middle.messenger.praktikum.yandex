// eslint.config.js
import js from "@eslint/js";
import globals from "globals";

export default [
  // 1. Игнорирование файлов — должно быть ПЕРВЫМ
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/postcss.config.js"
    ]
  },

  // 2. Базовая конфигурация ESLint
  js.configs.recommended,

  // 3. Пользовательская конфигурация
  {
    files: ["**/*.js", "**/*.mjs"], // Область применения правил
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  }
];
