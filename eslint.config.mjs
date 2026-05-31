import next from "eslint-config-next";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  ...next,
  {
    files: ["**/*.test.{js,jsx}", "**/__tests__/**/*.{js,jsx}"],
    rules: {
      "next/no-img-element": "off",
    },
  },
  eslintConfigPrettier,
  {
    ignores: [
      "next.config.js",
      "next-env.d.ts",
      ".next/",
      "out/",
      "build/",
      "scripts/contentful_*.js",
      "public/",
      "coverage/",
      "yarn.lock",
    ],
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];
