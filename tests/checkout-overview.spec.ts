import { test, expect } from '../src/fixtures/base.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo checkout overview', () => {
  test('displays checkout totals and finish action @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    await inventory.addFirstProduct();
    const checkout = await (await inventory.openCart()).checkout();
    await checkout.fillInformation(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);
    const overview = await checkout.continue();

    await expect(overview.itemTotal).toBeVisible();
    await expect(overview.tax).toBeVisible();
    await expect(overview.total).toBeVisible();
    await expect(overview.finishButton).toBeVisible();
  });
});