import { test as setup, expect } from '@playwright/test';
import {HomePage} from '../homework_25/pages/HomePage';


setup('Login and save storage state', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signinEmail').fill('fetreunnecrave-6959@yopmail.com');
  await page.locator('#signinPassword').fill('Qwe123**');
  await page.getByRole('button', { name: 'Login' }).click();

  
  await expect(page).toHaveURL(/garage/);

 
  await page.context().storageState({ path: 'storageState.json' });
});
