/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "async",
    "async/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "no-console": "off",
    "no-await-in-loop": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/no-unescaped-entities": "off",
    "no-restricted-globals": "off",
    "import/prefer-default-export": "off",
    "no-void": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-empty-pattern": "off",
    "import/order": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-await": "error",
  },
};
module.exports = config;
