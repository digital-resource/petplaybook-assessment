import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: ['dist', 'node_modules', '.next', '.vite'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      // Browser + DOM globals (window, fetch, HTMLxxxElement, CustomEvent, ...)
      // and Node globals (process, setTimeout, NodeJS namespace, ...) — this
      // project has both client (src/pages, src/components) and server
      // (src/server) TypeScript in the same file glob.
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // TypeScript understands ambient global types (NodeJS.*, lib.dom.d.ts
      // interfaces like EventListener) that no-undef's plain-JS scope
      // analysis doesn't; tsc --noEmit already catches genuine undefined
      // references with full type information, so this is the standard
      // typescript-eslint recommendation rather than a broad-ignore.
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];
