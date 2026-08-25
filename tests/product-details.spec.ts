import { test, expect } from '../src/fixtures/base.js';
import { InventoryPage } from '../src/pages/InventoryPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo product details', () => {
  test('opens a product detail page and returns to products @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    const details = await inventory.openProduct(data.products.backpack);

    await expect(details.productName).toContainText(data.products.backpack);
    await expect(details.productDescription).toBeVisible();
    await expect(details.productPrice).toHaveText('$29.99');
    await expect(details.productImage).toBeVisible();
    await expect(details.cartButton).toHaveText('Add to cart');

    const returnedInventory = await details.backToProducts();
    await expect(returnedInventory.productsHeading).toBeVisible();
  });
});