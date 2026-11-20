import { defineConfig, globalIgnores } from 'eslint/config'
import nextTs from 'eslint-config-next/typescript'
import base from './base.js'

/** ESLint config for plain TypeScript packages (packages/*). */
export default defineConfig([
  ...nextTs,
  ...base,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    },
  },
  globalIgnores(['dist/**', 'src/database.types.ts']),
])
