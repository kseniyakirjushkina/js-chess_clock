import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e', // Директория с E2E тестами
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // Запретить test.only в CI
  retries: process.env.CI ? 2 : 0, // Ретрии в CI
  workers: process.env.CI ? 1 : undefined, // Workers в CI
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3030', // Базовый URL для тестов
    trace: 'on-first-retry', // Собирать trace при ретраях
    screenshot: 'only-on-failure' // Делать скриншоты при падении
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
