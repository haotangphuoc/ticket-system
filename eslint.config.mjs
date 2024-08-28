import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginNode from "eslint-plugin-node";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  {
    // Apply ESLint to JavaScript, TypeScript, JSX, and TSX files
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    
    // Define the environment options, such as browser and Node.js
    languageOptions: {
      parser: parser, // Use TypeScript parser for TypeScript files
      globals: {
        ...globals.browser, // For frontend (React)
        ...globals.node,    // For backend (Node.js)
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },

    // Plugins and rules for various environments and frameworks
    plugins: {
      "@typescript-eslint": tseslint, // TypeScript ESLint plugin
      react: pluginReact,             // React-specific rules
      node: pluginNode,               // Node.js-specific rules
      prettier: pluginPrettier,       // Prettier integration
    },

    // Extend recommended configurations for TypeScript, React, Node.js, and Prettier
    rules: {
      // TypeScript Rules
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off", // You can enable this if you want stricter rules
      "@typescript-eslint/no-explicit-any": "warn", // Warn when using 'any'
      "eqeqeq": "error",

      // React Rules
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // TypeScript already handles prop-types validation
      "react/jsx-uses-react": "off", // Not needed in React 17+

      // Node.js Rules
      ...pluginNode.configs.recommended.rules,

      // Prettier Rules (to ensure formatting consistency)
      "prettier/prettier": "error", // Ensures Prettier formatting is enforced

      // General Rules
      "no-console": "warn", // Warn about console.logs (optional)
      "no-debugger": "warn", // Warn about debugger statements
    },

    settings: {
      // React version detection
      react: {
        version: "detect", // Automatically detect the version of React
      },
    },
  },
];
