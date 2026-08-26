import { test, expect } from '../src/fixtures/base.js';
import { CartPage } from '../src/pages/CartPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo cart', () => {
  test('views cart contents, continues shopping, and removes an item @smoke', async ({ page }) => {
    const cart = await test.step('Log in and open the cart', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      return inventory.openCart();
    });

    await test.step('Verify the cart contains one item', async () => {
      await expect(cart.cartHeading).toBeVisible();
      await expect(cart.quantities).toContainText('1');
    });

    const returnedInventory = await test.step('Continue shopping and reopen the cart', async () => {
      const inventory = await cart.continueShopping();
      await expect(inventory.productsHeading).toBeVisible();
      return inventory.openCart();
    });

    await test.step('Remove the item and verify the cart is empty', async () => {
      await returnedInventory.removeItem();
      await expect(returnedInventory.removeButtons).toHaveCount(0);
    });
  });

  test('shows the checkout action for a cart item @smoke', async ({ page }) => {
    const cart: CartPage = await test.step('Log in and open a cart with one item', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      return inventory.openCart();
    });

    await test.step('Verify the checkout action is visible', async () => {
      await expect(cart.checkoutButton).toBeVisible();
    });
  });
});