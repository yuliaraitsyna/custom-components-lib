import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: ["./tsconfig.json"],
      },
      globals: {
        ...globals.browser,
        __dirname: "readonly",
      },
    },
    ignores: ["dist/**", "node_modules/**", ".storybook/**"],
    plugins: 
      {
        prettier: prettierPlugin,
        "@typescript-eslint": tsPlugin,
      },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist/**", "node_modules/**", ".storybook/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": ["error"],
      "@typescript-eslint/consistent-type-imports": "warn",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },
  {
    files: ["webpack.config*.ts"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "prettier/prettier": ["error"],
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
];