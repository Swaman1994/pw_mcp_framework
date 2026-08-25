import { test, expect } from '../src/fixtures/base.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo checkout completion', () => {
  test('completes an order and returns home @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    await inventory.addFirstProduct();
    const checkout = await (await inventory.openCart()).checkout();
    await checkout.fillInformation(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);
    const overview = await checkout.continue();
    const complete = await overview.finish();

    await expect(complete.completeHeading).toBeVisible();
    await expect(complete.confirmationMessage).toBeVisible();
    const returnedInventory = await complete.backHome();
    await expect(returnedInventory.productsHeading).toBeVisible();
  });
});