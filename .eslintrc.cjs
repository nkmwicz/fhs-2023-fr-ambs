module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-extra-semi": "error",
    "no-trailing-spaces": "error",
    "no-mixed-spaces-and-tabs": "error",
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "comma-spacing": ["error", { before: false, after: true }],
    "no-console": "error",
    "no-debugger": "error",
    "no-unused-vars": "error",
    "no-var": "error",
  },
};
