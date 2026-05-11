// Flat config — minimal Phase-1 baseline; component-specific rules added later.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { react, 'react-hooks': reactHooks },
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Literal[value=/^#(?!DC2626|B91C1C|F59E0B|E6F8EC|FCE3E1|CDEFD8|F4C7C3)[0-9A-Fa-f]{6}$/i]',
          message:
            'Hard-coded hex outside the allowlist is forbidden. Use tokens instead. (Phase 1: only StringLiteral hex is checked; template-literal hex is a known Phase-2 gap.)',
        },
      ],
    },
  },
  {
    ignores: ['**/dist/**', '**/.turbo/**', '**/coverage/**', '**/.astro/**'],
  },
);
