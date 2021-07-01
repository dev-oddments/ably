module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // describe, context, it
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-return-await': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/extensions': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {},
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          webpack: {
            config: 'webpack.config.js',
          },
        },
      },
    },
  ],
};
