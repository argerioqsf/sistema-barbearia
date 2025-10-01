import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    env: {
      API_BASE_URL: 'http://localhost:3000',
      BASE_URL: 'http://localhost:3000',
      NEXT_INTL_TIMEZONE: 'UTC',
    },
  },
})
