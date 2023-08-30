/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  arrowParens: "always",
  bracketSameLine: false,
  jsxBracketSameLine: false,
  singleQuote: false,
  trailingComma: "all",
  singleAttributePerLine: true,
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
