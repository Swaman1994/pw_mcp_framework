import { test, expect } from '../src/fixtures/base.js';
import { CartPage } from '../src/pages/CartPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo cart', () => {
  test('views cart contents, continues shopping, and removes an item @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    await inventory.addFirstProduct();
    const cart = await inventory.openCart();

    await expect(cart.cartHeading).toBeVisible();
    await expect(cart.quantities).toContainText('1');
    const returnedInventory = await cart.continueShopping();
    await expect(returnedInventory.productsHeading).toBeVisible();
    const reopenedCart = await returnedInventory.openCart();
    await reopenedCart.removeItem();
    await expect(reopenedCart.removeButtons).toHaveCount(0);
  });

  test('shows the checkout action for a cart item @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    await inventory.addFirstProduct();
    const cart: CartPage = await inventory.openCart();

    await expect(cart.checkoutButton).toBeVisible();
  });
});