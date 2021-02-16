module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'prettier', 'jsx-a11y', 'jest', 'react-hooks'],
  rules: {
    'import/order': 1,
    'import/extensions': 0,
    'jsx-a11y/anchor-is-valid': [
      1,
      {
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-console': 0,
    'no-return-assign': 0,
    'no-use-before-define': 0,
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 1,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 1,
    'react/prop-types': 1,
    'react/no-array-index-key': 1,
    'react/no-unused-prop-types': 1,
  },
  overrides: [
    {
      files: ['src/store/slices/**/*Slice.js'],
      rules: {
        'no-param-reassign': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.js'],
};
