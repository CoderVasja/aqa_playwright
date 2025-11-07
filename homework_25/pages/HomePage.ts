import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signUpButton: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
   

 }
 async goto() {
  await this.page.goto('/');
}

async signUpButtonClick(){
  this.signUpButton.click()
};
}
