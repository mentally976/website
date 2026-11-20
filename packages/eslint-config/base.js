import { defineConfig } from 'eslint/config'

/** Hard limit for every source file in the monorepo. Split the file instead of raising it. */
export const MAX_LINES = 160

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    rules: {
      'max-lines': ['error', { max: MAX_LINES, skipBlankLines: false, skipComments: false }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'smart'],
      'prefer-const': 'error',
    },
  },
])
