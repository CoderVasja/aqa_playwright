import { test as base } from '@playwright/test';
import { GaragePage } from '../homework_28/GaragePage';

type MyFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.goto(); // відкриє GaragePage
    await use(garagePage);
  },
});
