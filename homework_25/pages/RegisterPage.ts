import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly errorBlock: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#signupName');
    this.lastName = page.locator('#signupLastName');
    this.email = page.locator('#signupEmail');
    this.password = page.locator('#signupPassword');
    this.confirmPassword = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.errorBlock = page.locator('.invalid-feedback');
    this.errorMessage = this.errorBlock.locator('p');
  }


  async fillForm(first?: string, last?: string, email?: string, pass?: string, confirm?: string) {
    if (first) {
      await this.firstName.fill(first);
    }
    if (last) {
      await this.lastName.fill(last);
    }
    if (email) {
      await this.email.fill(email);
    }
    if (pass) {
      await this.password.fill(pass);
    }
    if (confirm) {
      await this.confirmPassword.fill(confirm);
    }
  }
}
