import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
     "no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: ["**/*.test.{js,jsx}", "**/__tests__/**/*.{js,jsx}"],
    rules: {
      "@next/next/no-img-element": "off"
    },
  },
  {
    // Localhost-only admin portal: standard rules, but allow the
    // legitimate data-fetch-in-effect pattern (warn, not error).
    files: ["admin/**/*.{js,jsx}"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next.config.js",
    "public/**",
    "coverage/**",
    "scripts/contentful_*.js",
    "yarn.lock",
    "admin/.next/**",
    "admin/.snapshots/**",
  ])
]);
