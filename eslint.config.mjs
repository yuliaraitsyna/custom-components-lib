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
    ignores: ["lib/**", "node_modules/**", ".storybook/**",  "test/**/*", "**/*.stories.ts"],
    plugins: 
      {
        prettier: prettierPlugin,
        "@typescript-eslint": tsPlugin,
      },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["lib/**/*", "node_modules/**", ".storybook/**", "test/**/*", "**/*.stories.ts"],
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
    files: ["webpack.config.ts", "jest.config.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: null,
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "prettier": prettierPlugin,
    },
  },
  
];