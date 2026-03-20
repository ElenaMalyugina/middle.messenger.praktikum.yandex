/** @type {import("stylelint").Config} */
export default {
  "extends": ["stylelint-config-standard"],
  ignoreFiles: ['**/dist/*.css'],
  rules: {
    'color-function-alias-notation': null, //не можем отказаться ни от rgb, ни от rgba
    'color-function-notation':null,
    'alpha-value-notation': null,
    'selector-class-pattern': [
        '^[a-zA-Z][a-zA-Z0-9-]*(?:__[a-zA-Z][a-zA-Z0-9-]*)*(?:--[a-zA-Z][a-zA-Z0-9-]*)*$',
        {
            resolveNestedSelectors: true //у нас  БЭМ
        }
    ],
    'at-rule-no-unknown': [
        true,
        {
            ignoreAtRules: ['extend'] //postcss
        }
    ],
    'no-duplicate-selectors': null, // БЭМ, вложенные селекторы, медиазапросы



  }
};
