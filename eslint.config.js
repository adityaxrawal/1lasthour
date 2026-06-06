import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  {
    ignores: ['dist', '.eslintrc.cjs', 'scripts', '.antigravity'],
  },
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
      'react-refresh': reactRefresh.plugin ? reactRefresh.plugin : reactRefresh,
      react: fixupPluginRules(react),
      'jsx-a11y': fixupPluginRules(jsxA11y),
      import: fixupPluginRules(importPlugin),
    },
    settings: {
      react: { version: 'detect' },
      'import/core-modules': ['vitest/config', 'rollup-plugin-visualizer', '@testing-library/jest-dom'],
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './jsconfig.json' },
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off',
      'react/jsx-no-useless-fragment': 'warn',
      'react/self-closing-comp': 'warn',
      'react/display-name': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['../*/features/*/*/**'], message: 'Import from the feature index barrel, not deep paths.' },
          { group: ['../../components/**', '../../hooks/**'], message: 'Use the alias @components or @hooks.' }
        ]
      }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }],
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      }],
      'import/no-relative-parent-imports': 'off',
    },
  },
];
