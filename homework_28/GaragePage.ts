import { Page, Locator, expect } from '@playwright/test';

export class GaragePage {
  readonly page: Page;
  readonly message: Locator;

 
  constructor(page: Page) {
    this.page = page; 
    this.message = page.locator('.panel-empty_message')
 }

 async goto() {
  await this.page.goto('/panel/garage');
}

async checkTitle(){
  await expect(this.message).toBeVisible();
}
}
