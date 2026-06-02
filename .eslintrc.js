module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['cypress'],
  extends: ['plugin:cypress/recommended'],
  rules: {
    'no-unused-vars': 'warn',
  },
  ignorePatterns: ['node_modules/', 'cypress/videos/', 'cypress/screenshots/'],
};
