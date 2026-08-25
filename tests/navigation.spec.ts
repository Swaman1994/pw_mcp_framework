import { test, expect } from '../src/fixtures/base.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo navigation and application state', () => {
  test('logs out and blocks the inventory route afterward @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    await inventory.menu.open();
    await inventory.menu.logout();
    await expect(login.loginButton).toBeVisible();

    await page.goto(`${data.baseUrl}/inventory.html`);
    await expect(login.errorMessage).toContainText('only access');
  });

  test('resets application state without logging out @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    await inventory.addFirstProduct();
    await inventory.menu.open();
    await inventory.menu.resetAppState();

    await expect(inventory.productsHeading).toBeVisible();
    await expect(inventory.addToCartButtons).toHaveCount(6);
  });

  test('keeps the inventory usable at a mobile viewport @regression', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);

    await expect(inventory.productsHeading).toBeVisible();
    await expect(inventory.menu.openMenuButton).toBeVisible();
  });
});