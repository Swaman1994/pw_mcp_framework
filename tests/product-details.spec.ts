import { test, expect, attachStepScreenshot } from '../src/fixtures/base.js';
import { InventoryPage } from '../src/pages/InventoryPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo product details', () => {
  test('opens a product detail page and returns to products @smoke', async ({ page }, testInfo) => {
    const details = await test.step('Log in and open the backpack details', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      const details = await inventory.openProduct(data.products.backpack);
      await attachStepScreenshot(page, testInfo, 'Log in and open the backpack details');
      return details;
    });
    await test.step('Verify the backpack details', async () => {
      await expect(details.productName).toContainText(data.products.backpack);
      await expect(details.productDescription).toBeVisible();
      await expect(details.productPrice).toHaveText('$29.99');
      await expect(details.productImage).toBeVisible();
      await expect(details.cartButton).toHaveText('Add to cart');
      await attachStepScreenshot(page, testInfo, 'Verify the backpack details');
    });
    await test.step('Return to the products page', async () => {
      const returnedInventory = await details.backToProducts();
      await expect(returnedInventory.productsHeading).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Return to the products page');
    });
  });
});