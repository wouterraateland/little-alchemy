import { FlatCompat } from "@eslint/eslintrc";

export default new FlatCompat({
  baseDirectory: import.meta.dirname,
}).config({
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  globals: {
    React: true,
  },
  ignorePatterns: ["node_modules/", "public/"],
  overrides: [
    {
      files: ["*.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: import.meta.dirname,
  },
  plugins: [
    "@typescript-eslint",
    "no-relative-import-paths",
    "simple-import-sort",
    "unused-imports",
  ],
  root: true,
  rules: {
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-type-parameters": "off",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/unbound-method": "off",
    curly: ["error", "multi"],
    eqeqeq: "error",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/no-duplicates": ["error", { "prefer-inline": false }],
    "import/no-named-as-default": "off",
    "import/no-unresolved": "off",
    "no-relative-import-paths/no-relative-import-paths": [
      "warn",
      { allowSameFolder: false, rootDir: "src" },
    ],
    quotes: ["error", "double", { avoidEscape: true }],
    "react/jsx-sort-props": [
      "error",
      { ignoreCase: true, multiline: "ignore", reservedFirst: ["key", "ref"] },
    ],
    "react/no-unused-prop-types": "error",
    "simple-import-sort/imports": "error",
    "unused-imports/no-unused-imports": "error",
  },
});
