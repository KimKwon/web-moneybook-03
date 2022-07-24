module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'eslint:recommended', 'plugin:import/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '_', argsIgnorePattern: '_' }],
    'no-console': 'warn',
    'import/no-duplicates': ['error'],
    'no-case-declarations': 'off',
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};
