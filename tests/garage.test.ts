import { test} from '../fixtures/userGaragePage';

test.only('Check title', async ({ userGaragePage }) => {
  await userGaragePage.checkTitle();
});
