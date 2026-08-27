import { test, expect, attachStepScreenshot } from '../src/fixtures/base.js';
import { CartPage } from '../src/pages/CartPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo cart', () => {
  test('views cart contents, continues shopping, and removes an item @smoke', async ({ page }, testInfo) => {
    const cart = await test.step('Log in and open the cart', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      const openedCart = await inventory.openCart();
      await attachStepScreenshot(page, testInfo, 'Log in and open the cart');
      return openedCart;
    });

    await test.step('Verify the cart contains one item', async () => {
      await expect(cart.cartHeading).toBeVisible();
      await expect(cart.quantities).toContainText('1');
      await attachStepScreenshot(page, testInfo, 'Verify the cart contains one item');
    });

    const returnedInventory = await test.step('Continue shopping and reopen the cart', async () => {
      const inventory = await cart.continueShopping();
      await expect(inventory.productsHeading).toBeVisible();
      const reopenedCart = await inventory.openCart();
      await attachStepScreenshot(page, testInfo, 'Continue shopping and reopen the cart');
      return reopenedCart;
    });

    await test.step('Remove the item and verify the cart is empty', async () => {
      await returnedInventory.removeItem();
      await expect(returnedInventory.removeButtons).toHaveCount(0);
      await attachStepScreenshot(page, testInfo, 'Remove the item and verify the cart is empty');
    });
  });

  test('shows the checkout action for a cart item @smoke', async ({ page }, testInfo) => {
    const cart: CartPage = await test.step('Log in and open a cart with one item', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      const openedCart = await inventory.openCart();
      await attachStepScreenshot(page, testInfo, 'Log in and open a cart with one item');
      return openedCart;
    });

    await test.step('Verify the checkout action is visible', async () => {
      await expect(cart.checkoutButton).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Verify the checkout action is visible');
    });
  });
});