module.exports = {
  extends: ["airbnb-typescript", "airbnb/hooks", "plugin:@typescript-eslint/recommended", "plugin:jest/recommended", "plugin:prettier/recommended", "plugin:import/recommended", "plugin:storybook/recommended"],
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'linebreak-style': 'off',
    'prettier/prettier': ['error', {
      endOfLine: 'auto'
    }],
  },
  settings: { 
    'import/resolver': {
      typescript: {
        directory: "."
      }
    }
  }
};