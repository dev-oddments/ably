module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // describe, context, it
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    context: 'readonly',
  },
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
    'no-return-await': 0,
    'import/no-unresolved': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/extensions': 0,
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
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
