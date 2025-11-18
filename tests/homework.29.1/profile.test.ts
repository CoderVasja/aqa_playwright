import { test, expect } from '@playwright/test';
import {HomePage} from '../../homework_25/pages/HomePage';

test('Change profile via API', async ({ page }) => {
  
  await page.route('**/api/users/profile', async (route) => {
    const fakeUser = {
        status: "ok",
        data: {
          userId: 301675,
          photoFilename: "default-user.png",
          name: "Mock",
          lastName: "Vasyl"
        }
      };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeUser)
    });
  });

  
  const homePage = new HomePage(page);
  await homePage.goto();

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signinEmail').fill('fetreunnecrave-6959@yopmail.com');
  await page.locator('#signinPassword').fill('Qwe123**');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/garage/);

  await page.goto('https://qauto.forstudy.space/panel/profile');

  await expect(page.locator('.profile_name')).toHaveText('Mock Vasyl');
  });