import { test, expect } from '@playwright/test';

import {HomePage} from '../../homework_25/pages/HomePage';
import { RegisterPage } from '../../homework_25/pages/RegisterPage';

test('Positive sign up', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
 
  await homePage.goto();

  await homePage.signUpButton.click();
  await registerPage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
  await registerPage.registerButton.click();

  await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
});

test('Negative sign up (empty name field)', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  await homePage.goto();

  await homePage.signUpButton.click();
  await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();


  await registerPage.fillForm('', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');

  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();


});


test('Negative sign up (Passwords do not match)', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  await homePage.goto();

  await homePage.signUpButton.click();
  await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();


 await registerPage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!!');

  await registerPage.password.click();

  await expect(registerPage.errorBlock).toBeVisible();
  await expect(registerPage.errorMessage).toHaveText('Passwords do not match');
  await expect(registerPage.page.getByRole('button', { name: 'Register' })).toBeDisabled();


});


test('Negative sign up (Invalid email)', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  await homePage.goto();

  await homePage.signUpButton.click();
  await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();

  await registerPage.fillForm('John', 'Doe', 'john', 'Password123!', 'Password123!');

  await registerPage.password.click();

  await expect(registerPage.errorBlock).toBeVisible();
  await expect(registerPage.errorMessage).toHaveText('Email is incorrect');
  await expect(registerPage.page.getByRole('button', { name: 'Register' })).toBeDisabled();


});

test('Negative sign up (Invalid Name)', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  await homePage.goto();

  await homePage.signUpButton.click();
  await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();

 await registerPage.fillForm('J', 'Doe');

  await expect(registerPage.errorBlock).toBeVisible();
  await expect(registerPage.errorMessage).toHaveText('Name has to be from 2 to 20 characters long');
  await expect(registerPage.page.getByRole('button', { name: 'Register' })).toBeDisabled();


});
