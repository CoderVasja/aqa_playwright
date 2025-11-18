import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Завантажуємо змінні з .env
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts$/,    // Наприклад tests/login.setup.ts
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
    }
    // Можна додати мобільні або інші конфіги, якщо потрібно
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
