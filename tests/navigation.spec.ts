import { test, expect, attachStepScreenshot } from '../src/fixtures/base.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo navigation and application state', () => {
  test('logs out and blocks the inventory route afterward @smoke @critical', async ({ page }, testInfo) => {
    const login = new LoginPage(page);
    await test.step('Log in and log out from the navigation menu', async () => {
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.menu.open();
      await inventory.menu.logout();
      await expect(login.loginButton).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Log in and log out from the navigation menu');
    });
    await test.step('Verify the inventory route is blocked after logout', async () => {
      await page.goto(`${data.baseUrl}/inventory.html`);
      await expect(login.errorMessage).toContainText('only access');
      await attachStepScreenshot(page, testInfo, 'Verify the inventory route is blocked after logout');
    });
  });

  test('resets application state without logging out @regression', async ({ page }, testInfo) => {
    const inventory = await test.step('Log in, add a product, and reset app state', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const loggedIn = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await loggedIn.addFirstProduct();
      await loggedIn.menu.open();
      await loggedIn.menu.resetAppState();
      await attachStepScreenshot(page, testInfo, 'Log in, add a product, and reset app state');
      return loggedIn;
    });
    await test.step('Verify reset preserved login and cleared the cart', async () => {
      await expect(inventory.productsHeading).toBeVisible();
      await expect(inventory.addToCartButtons).toHaveCount(5);
      await attachStepScreenshot(page, testInfo, 'Verify reset preserved login and cleared the cart');
    });
  });

  test('keeps the inventory usable at a mobile viewport @regression', async ({ page }, testInfo) => {
    const inventory = await test.step('Log in using a mobile viewport', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await attachStepScreenshot(page, testInfo, 'Log in using a mobile viewport');
      return inventory;
    });
    await test.step('Verify the mobile inventory layout', async () => {
      await expect(inventory.productsHeading).toBeVisible();
      await expect(inventory.menu.openMenuButton).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Verify the mobile inventory layout');
    });
  });
});