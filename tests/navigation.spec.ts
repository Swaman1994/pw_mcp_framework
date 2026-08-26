import { test, expect } from '../src/fixtures/base.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo navigation and application state', () => {
  test('logs out and blocks the inventory route afterward @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await test.step('Log in and log out from the navigation menu', async () => {
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.menu.open();
      await inventory.menu.logout();
      await expect(login.loginButton).toBeVisible();
    });
    await test.step('Verify the inventory route is blocked after logout', async () => {
      await page.goto(`${data.baseUrl}/inventory.html`);
      await expect(login.errorMessage).toContainText('only access');
    });
  });

  test('resets application state without logging out @regression', async ({ page }) => {
    const inventory = await test.step('Log in, add a product, and reset app state', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const loggedIn = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await loggedIn.addFirstProduct();
      await loggedIn.menu.open();
      await loggedIn.menu.resetAppState();
      return loggedIn;
    });
    await test.step('Verify reset preserved login and cleared the cart', async () => {
      await expect(inventory.productsHeading).toBeVisible();
      await expect(inventory.addToCartButtons).toHaveCount(5);
    });
  });

  test('keeps the inventory usable at a mobile viewport @regression', async ({ page }) => {
    const inventory = await test.step('Log in using a mobile viewport', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      const login = new LoginPage(page);
      await login.goto();
      return login.loginAs(data.users.standard.username, data.users.standard.password);
    });
    await test.step('Verify the mobile inventory layout', async () => {
      await expect(inventory.productsHeading).toBeVisible();
      await expect(inventory.menu.openMenuButton).toBeVisible();
    });
  });
});