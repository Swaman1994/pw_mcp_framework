import { test, expect, attachStepScreenshot } from '../src/fixtures/base.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo checkout completion', () => {
  test('completes an order and returns home @smoke @critical', async ({ page }, testInfo) => {
    const complete = await test.step('Complete checkout and finish the order', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      const checkout = await (await inventory.openCart()).checkout();
      await checkout.fillInformation(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);
      const overview = await checkout.continue();
      const completed = await overview.finish();
      await attachStepScreenshot(page, testInfo, 'Complete checkout and finish the order');
      return completed;
    });
    await test.step('Verify the order confirmation', async () => {
      await expect(complete.completeHeading).toBeVisible();
      await expect(complete.confirmationMessage).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Verify the order confirmation');
    });
    await test.step('Return home and verify the inventory page', async () => {
      const returnedInventory = await complete.backHome();
      await expect(returnedInventory.productsHeading).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Return home and verify the inventory page');
    });
  });
});